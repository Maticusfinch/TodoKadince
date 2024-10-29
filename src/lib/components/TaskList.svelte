<script>
	import Task from "./Task.svelte";

	export let filterSelectValue;
	export let taskList;

	function handleDelete(taskToDelete) {
		taskList = taskList.filter(({task}) => task !== taskToDelete);
	}
</script>

{#if taskList.length === 0}
	<span>Add a new task below</span>
{:else}
	<div class="right margin-bottom-3px">
		<select bind:value={filterSelectValue}>
			<option>All</option>
			<option>In Progress</option>
			<option>Completed</option>
			<!-- Add if there's time: <option>Containing matched word</option> -->
		</select>
	</div>
	{#each taskList as {task, completedTimestamp}}
		{#if filterSelectValue === "All"}
			<Task bind:task bind:completedTimestamp onDelete={handleDelete}/>
		{:else if filterSelectValue === "In Progress" && !completedTimestamp}
			<Task bind:task bind:completedTimestamp onDelete={handleDelete}/>
		{:else if filterSelectValue === "Completed" && completedTimestamp}
			<Task bind:task bind:completedTimestamp onDelete={handleDelete}/>
		{/if}
	{/each}
{/if}

<style>
	.margin-bottom-3px {
		margin-bottom: 3px;
	}

	.right {
		margin-left: auto;
		margin-right: 0px;
		width: fit-content;
	}
</style>
