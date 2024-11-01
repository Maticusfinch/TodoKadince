<script>
	import TaskList from "$lib/components/TaskList.svelte";

	$: showTaskList = true;
	$: taskList = [];
	let addButton;
	let filterAllButton;
	let filterCompletedButton;
	let filterInProgressButton;
	let filterValue = "All";
	let taskInput;

	function addTask() {
		if (taskInput.value !== "" && taskList.every(({task}) => task !== taskInput.value)) {
			taskList = [...taskList, {id: taskList.length + 1, task: taskInput.value, completedTimestamp: null, status: "In Progress"}];
			taskInput.value = "";
		}
	}

	function changeFilter(event) {
		const transitionFromCount = taskList.filter(({status}) => filterValue === status || filterValue === "All").length;
		showTaskList = transitionFromCount === 0;
		filterValue = event.srcElement.innerText;

		switch (filterValue) { 
			case "All":
				filterCompletedButton.classList.remove("selected");
				filterInProgressButton.classList.remove("selected");
				setTransitionTimeoutHandler(transitionFromCount);
				filterAllButton.classList.add("selected");

				break;
			case "Completed":
				filterAllButton.classList.remove("selected");
				filterInProgressButton.classList.remove("selected");
				setTransitionTimeoutHandler(transitionFromCount);
				filterCompletedButton.classList.add("selected");

				break;
			case "In Progress":
				filterAllButton.classList.remove("selected");
				filterCompletedButton.classList.remove("selected");
				setTransitionTimeoutHandler(transitionFromCount);
				filterInProgressButton.classList.add("selected");
		}
	}

	function handleKeypress(event) {
		if (event.key === "Enter") {
			addTask();
		}
	}

	function setTransitionTimeoutHandler(transitionFromCount) {
		if (transitionFromCount > 0) {
			setTimeout(() => {showTaskList = true}, 400);
		}
	}
</script>

<div id="addTaskContainerBackdrop"></div>
<div id="addTaskContainer">
	<input bind:this={taskInput} id="addTaskInput" type="text" placeholder="Choose your next weapon against laziness" onkeypress="{handleKeypress}"/>
	<i bind:this={addButton} onclick={addTask} class="checkbox fas fa-plus" aria-label="Add Task"></i>
</div>
<div id="filterContainer">
	<button bind:this={filterAllButton} class="selected" onclick={changeFilter}>All</button>
	<button bind:this={filterInProgressButton} onclick={changeFilter}>In Progress</button>
	<button bind:this={filterCompletedButton} onclick={changeFilter}>Completed</button>
</div>
<div id="mainContainer">
	<div id="taskListContainer" class="center margin-top">
		<div>
			<TaskList bind:taskList bind:filterValue bind:showTaskList/>
		</div>
	</div>
</div>

<style>
	#addTaskContainer {
		align-items: center;
		background-color: #333333;
		border: solid 1px #229988;
		border-radius: 2px;
		display: grid;
		grid-template-columns: 1fr fit-content(10px);
		left: 50%;
		top: 5%;
		position: fixed;
		transform: translateX(-50%);
		width: 40%
	}

	#addTaskContainer * {
		border: none;
	}

	#addTaskContainerBackdrop {
		background-color: #222222;
		height: 17vh;
		left: 0;
		right: 0;
		top: 0;
		position: fixed;
		width: 100%;
	}

	#addTaskInput {
		border-color: #229988;
		background-color: #333333;
		color: #229988;
		font-size: 18px;
		padding: 9px;
	}

	#addTaskInput:focus {
		border-color: #229988;
	}

	#filterContainer {
		display: grid;
		grid-template-columns: 33% 34% 33%;
		left: 50%;
		position: fixed;
		top: 11%;
		transform: translateX(-50%);
		width: 59%;
	}

	#filterContainer .selected {
		background-color: #229988;
		color: #333333;
	}

	#filterContainer button {
		color: #229988;
		cursor: pointer;
		background-color: #333333;
		border: none;
		border-radius: 5px;
		height: 38px;
		font-size: 20px;
		font-weight: 700;
	}

	#mainContainer {
		height: 83vh;
		left: 50%;
		overflow-y: auto;
		position: fixed;
		scrollbar-gutter: stable;
		top: 17%;
		transform: translateX(-50%);
		width: 100%;
	}

	#taskListContainer {
		align-content: center;
		display: grid;
		grid-template-rows: 1fr fit-content(300px) fit-content(100px);
		height: 90vh - 200px;
		margin-bottom: 24px;
		margin-left: auto;
		margin-right: auto;
		margin-top: auto;
		overflow-y: auto;
		width: 80%;
	}

	.checkbox {
		background-color: #555555;
		padding: 9px
	}

	@media (min-width:700px) {
		#taskListContainer {
			width: 60%;
		}
	}
</style>
