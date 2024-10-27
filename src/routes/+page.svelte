<script>
	import TaskList from "$lib/components/TaskList.svelte";
	let taskInput = "";
	let taskList = [];

	function handleKeypress(event) {
		if (event.key === "Enter" && taskInput !== "") {

			taskList = [...taskList, 
				{task: taskInput, completedTimestamp: null}
			];
		}
	}
</script>

<div class="center margin-top">
	<TaskList bind:taskList={taskList}/>
</div>
<input id="taskInput" type="text" bind:value={taskInput} placeholder="Choose your next weapon against laziness" onkeypress="{handleKeypress}"/>

<style>
	.center {
		margin-left: auto;
		margin-right: auto;
		width: 40%;
	}

	.margin-top {
		margin-top: 20px;
	}

	#taskInput {
		bottom: 20px;
		left: 50%;
		position: fixed;
		transform: translate(-50%, 0);
		width: 40%;
	}
</style>
