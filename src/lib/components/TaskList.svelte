<script>
	import Task from "./Task.svelte";

	export let filterSelectValue;
	export let taskList;

	function handleDelete(taskToDelete) {
		taskList = taskList.filter(({task}) => task !== taskToDelete);
	}

	function handleSave(taskId, taskToSave) {
		if (taskToSave !== "" && taskList.every(({task}) => task !== taskToSave)) {
			let existingTask = taskList.find((task) => task.id === taskId);

			if (existingTask) {
				taskList = [...taskList.filter(({id}) => id !== existingTask.id), {task: taskToSave, completedTimestamp: existingTask.completedTimestamp}];
			}
		}
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
	{#each taskList as {id, task, completedTimestamp} (id)}
		{#if filterSelectValue === "All"}
			<Task bind:id bind:task bind:completedTimestamp onDelete={handleDelete} onSave={handleSave}/>
		{:else if filterSelectValue === "In Progress" && !completedTimestamp}
			<Task bind:id bind:task bind:completedTimestamp onDelete={handleDelete} onSave={handleSave}/>
		{:else if filterSelectValue === "Completed" && completedTimestamp}
			<Task bind:id bind:task bind:completedTimestamp onDelete={handleDelete} onSave={handleSave}/>
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
