<script>
	import Task from "./Task.svelte";

	export let filterValue = "All";
	export let taskList;
	export let showTaskList;

	function handleDelete(taskIdToDelete) {
		taskList = taskList.filter(({id}) => id !== taskIdToDelete);
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

{#each taskList as {id, task, completedTimestamp, status} (id)}
	{#if filterValue === "All" && showTaskList}
		<Task bind:id bind:task bind:completedTimestamp bind:status onDelete={handleDelete} onSave={handleSave}/>
	{:else if filterValue === "In Progress" && status === "In Progress" && showTaskList}
		<Task bind:id bind:task bind:completedTimestamp bind:status onDelete={handleDelete} onSave={handleSave}/>
	{:else if filterValue === "Completed" && status === "Completed" && showTaskList}
		<Task bind:id bind:task bind:completedTimestamp bind:status onDelete={handleDelete} onSave={handleSave}/>
	{/if}
{/each}
