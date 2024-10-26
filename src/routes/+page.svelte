<script>
	import TaskList from "$lib/components/TaskList.svelte";
	let task = "";
	let taskList = [];

	function handleKeypress(event) {
		if (event.key === "Enter" && task !== "") {
			taskList = [...taskList, task];
		}
	}
</script>

<div class="center">
	<TaskList bind:taskList/>
</div>
<input id="taskInput" type="text" bind:value={task} placeholder="Choose your next weapon against laziness" onkeypress="{handleKeypress}"/>

<style>
	.center {
		margin-left: auto;
		margin-right: auto;
		width: 40%;
	}

	#taskInput {
		bottom: 20px;
		left: 50%;
		position: fixed;
		transform: translate(-50%, 0);
		width: 40%;
	}
</style>
