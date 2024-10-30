<script>
	import TaskList from "$lib/components/TaskList.svelte";
	$: taskList = [];
	let filterSelectValue = "All";
	let sendButton;
	let taskInput;

	function addTask() {
		if (taskInput.value !== "" && taskList.every(({task}) => task !== taskInput.value)) {
			taskList = [...taskList, {id: taskList.length + 1, task: taskInput.value, completedTimestamp: null}];
			taskInput.value = "";
		}
	}

	function handleKeypress(event) {
		if (event.key === "Enter") {
			addTask();
		}
	}

</script>

<div class="center margin-top">
	<TaskList bind:taskList bind:filterSelectValue/>
</div>
<div class="container">
	<input bind:this={taskInput} type="text" placeholder="Choose your next weapon against laziness" onkeypress="{handleKeypress}"/>
	<button bind:this={sendButton} onclick={addTask} aria-label="send"><i class="fas fa-plus"></i></button>
</div>
<style>
	.center {
		margin-left: auto;
		margin-right: auto;
		width: 80%;
	}

	.container {
		border: solid 1px black;
		border-radius: 2px;
		bottom: 20px;
		display: grid;
		grid-template-columns: 1fr fit-content(10px);
		left: 50%;
		position: fixed;
		transform: translate(-50%, 0);
		width: 80%;
	}

	.container * {
		border: none;
	}

	.container button {
		background-color: white;
		color: black;
	}

	.margin-top {
		margin-top: 20px;
	}

	@media (min-width:700px) {
		.center {
			width: 40%;
		}

		.container {
			width: 40%;
		}
	}
</style>
