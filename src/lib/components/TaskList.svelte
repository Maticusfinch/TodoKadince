<script>
	import Task from "./Task.svelte";

	export let taskList;
	let filterSelectValue;
	let filteredTaskList = [];

	function updateFilter() {
		filteredTaskList = [];

		if (filterSelectValue === "Completed") {
			taskList.forEach(({task, completedTimestamp}) => {
				if (completedTimestamp) {
					filteredTaskList = [...filteredTaskList, {task, completedTimestamp}];
				}
			});
		} else if (filterSelectValue === "In Progress") {
			taskList.forEach(({task, completedTimestamp}) => {
				if (!completedTimestamp) {
					filteredTaskList = [...filteredTaskList, {task, completedTimestamp}];
				}
			});
		}
	}
</script>

{#if taskList.length === 0}
	<span>Add a new task below</span>
{:else}
	<div class="right margin-bottom-3px">
		<select bind:value={filterSelectValue} onchange={updateFilter}>
			<option>All</option>
			<option>In Progress</option>
			<option>Completed</option>
			<!-- Add if there's time: <option>Containing matched word</option> -->
		</select>
	</div>
	{#if filterSelectValue === "All"}
		{#each taskList as {task, completedTimestamp}}
			<div class="border">
				<Task bind:task bind:completedTimestamp/>
			</div>
		{/each}
	{:else if filteredTaskList.length === 0}
		{#if filterSelectValue === "Completed"}
			<span>You haven't completed any tasks yet - Better get crackin'!</span>
		{:else}
			<span>You've completed all tasks so far. Keep it goin'!</span>
		{/if}
	{:else}
		{#each filteredTaskList as {task, completedTimestamp}}
			<div class="border">
				<Task bind:task bind:completedTimestamp/>
			</div>
		{/each}
	{/if}
{/if}

<style>
	.border {
		border: solid 1px black;
	}

	.margin-bottom-3px {
		margin-bottom: 3px;
	}

	.right {
		margin-left: auto;
		margin-right: 0px;
		width: fit-content;
	}
</style>
