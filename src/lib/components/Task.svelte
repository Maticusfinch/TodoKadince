<script>
	import {formatTimestamp} from "../utilities/DateUtil.js";
    import Checkbox from "./Checkbox.svelte";

	export let completedTimestamp;
	export let id;
	export let task;
	export let onDelete;
	export let onSave;
	let checked = completedTimestamp;
	let editButton;
	let saveButton;
	let cancelButton;
	let deleteButton;
	let taskInput;
	let taskSpan;

	function buildTaskText() {
		return task + (completedTimestamp ? " (Completed on: " + formatTimestamp(completedTimestamp) + ")" : "");
	}

	function cancelAndDisableEdit() {
		disableEdit(false);
	}

	function disableEdit(saveTask) {
		editButton.classList.remove("hidden");
		saveButton.classList.add("hidden");
		cancelButton.classList.add("hidden");
		deleteButton.classList.add("hidden");
		taskSpan.classList.remove("hidden");
		taskInput.classList.add("hidden")
		
		if (saveTask) {
			if (task !== taskInput.value) {
				return onSave(id, taskInput.value);
			}
		}
	}

	function enableEdit() {
		editButton.classList.add("hidden");
		saveButton.classList.remove("hidden");
		cancelButton.classList.remove("hidden");
		deleteButton.classList.remove("hidden");
		taskSpan.classList.add("hidden");
		taskInput.classList.remove("hidden")
		taskInput.value = task;
	}

	function handleDeleteButtonClick() {
		disableEdit(false);

		return onDelete(task);
	}

	function handleTaskInputKeydown(event) {
		if (event.key === "Enter") {
			disableEdit(true);

		} else if (event.key === "Escape") {
			disableEdit(false);
		}
	}

	function saveAndDisableEdit() {
		disableEdit(true);
	}

	function toggleTaskCompletion() {
		completedTimestamp = checked ? Date.now() : null;
	}
</script>

<div class="container">
	<Checkbox bind:checked style="grid-row: 1" onclick={toggleTaskCompletion}/>
	<input bind:this={taskInput} id="taskInput" class="hidden" style="grid-column: 2; grid-row: 1;" type="text" placeholder="Leaving this empty would be cheating..." onkeydown={handleTaskInputKeydown}/>
	<span bind:this={taskSpan} id="taskSpan" style="grid-column: 2; grid-row: 1;">{buildTaskText()}</span>
	<div class="container">
		<i bind:this={editButton} class="fas fa-pencil" aria-label="edit" onclick={enableEdit}></i>
		<i bind:this={saveButton} class="hidden fas fa-save" aria-label="save" onclick={saveAndDisableEdit}></i>
		<i bind:this={cancelButton} class="hidden fas fa-circle-xmark" aria-label="cancel" onclick={cancelAndDisableEdit}></i>
		<i bind:this={deleteButton} class="hidden fas fa-trash" aria-label="delete" onclick={handleDeleteButtonClick}></i>
	</div>
</div>


<style>
	#taskInput {
		border: none;
		background: #222222;
		color: #229988;
		font-size: 20px;
		margin-left: 9px;
		padding: 9px;
	}

	#taskSpan {
		font-size: 20px;
		margin-left: 14px;
	}

	.container {
		align-items: center;
		background-color: #333333;
		border-radius: 5px;
		display: grid;
		gap: 3px;
		grid-template-columns: fit-content(100px) 1fr fit-content(200px);
		margin-bottom: 9px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 9px;
		padding: 9px 9px 9px 14px;
		width: 80%;
	}

	.container .container {
		align-content: center;
		background-color: #333333;
		border: none;
		gap: 3px;
		margin: 0px;
		padding: 0px;
	}

	.container .container i {
		padding-left: 5px;
	}

	.fa-circle-xmark {
		color: gold;
	}

	.fa-trash {
		color: salmon;
	}

	.fa-save {
		color: #229988;
	}

	.hidden {
		display: none;
	}
</style>
