<script>
	import Task from "./Task.svelte";
	export let taskList;
</script>

{#if taskList.length === 0}
	<span>Add a new task below</span>
{:else}
	{#each taskList as task}
		<div>
			<Task task={task}/>
		</div>
	{/each}
{/if}

<style>
	div {
		border: solid 1px black;
	}
</style>
