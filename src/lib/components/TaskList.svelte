<script>
	import Task from "./Task.svelte";

	export let filterValue = "All";
	export let taskList;

	function handleDelete(taskToDelete) {
		taskList = taskList.filter(({task}) => task !== taskToDelete);
	}

	function handleSave(taskId, taskToSave) {
		if (taskToSave !== "" && taskList.every(({task}) => task !== taskToSave)) {
			const taskIndex = taskList.findIndex(task => task.id === taskId);

			if (taskIndex !== -1) {
				taskList[taskIndex].task = taskToSave;
			}
		}
	}
</script>

{#if taskList.length > 0}
	{#each taskList as {id, task, completedTimestamp} (id)}
		{#if filterValue === "All"}
			<Task bind:id bind:task bind:completedTimestamp onDelete={handleDelete} onSave={handleSave}/>
		{:else if filterValue === "In Progress" && !completedTimestamp}
			<Task bind:id bind:task bind:completedTimestamp onDelete={handleDelete} onSave={handleSave}/>
		{:else if filterValue === "Completed" && completedTimestamp}
			<Task bind:id bind:task bind:completedTimestamp onDelete={handleDelete} onSave={handleSave}/>
		{/if}
	{/each}
{/if}
