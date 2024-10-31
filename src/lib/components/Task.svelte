<script>
	import {formatTimestamp} from "../utilities/DateUtil.js";
    import Checkbox from "./Checkbox.svelte";

	export let completedTimestamp;
	export let id;
	export let task;
	export let onDelete;
	export let onSave;
	let checked = completedTimestamp;
	let completedCheckbox;
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
	<input bind:this={taskInput} class="hidden" style="grid-column: 2; grid-row: 1;" type="text" placeholder="Leaving this empty would be cheating..." onkeydown={handleTaskInputKeydown}/>
	<span bind:this={taskSpan} style="grid-column: 2; grid-row: 1;">{buildTaskText()}</span>
	<div class="container">
		<button bind:this={editButton} aria-label="edit" onclick={enableEdit}><i class="fas fa-pencil"></i></button>
		<button bind:this={saveButton} class="hidden" aria-label="save" onclick={saveAndDisableEdit}><i class="fas fa-save"></i></button>
		<button bind:this={cancelButton} class="hidden" aria-label="cancel" onclick={cancelAndDisableEdit}><i class="fas fa-circle-xmark"></i></button>
		<button bind:this={deleteButton} class="hidden" aria-label="delete" onclick={handleDeleteButtonClick}><i class="fas fa-trash"></i></button>
	</div>
</div>


<style>
	.container {
		align-items: center;
		background-color: #333333;
		border: solid 1px black;
		border-radius: 5px;
		display: grid;
		gap: 3px;
		grid-template-columns: fit-content(100px) 1fr fit-content(200px);
		padding: 9px;
	}

	.container * {
		padding: 9px;
	}
	
	.container .container {
		align-content: center;
		border: none;
		gap: 2px;
		padding: 0px;
	}

	.container .container * {
		background-color: #666666;
		padding: 0px;
	}

	.container button {
		border: none;
		height: fit-content;
		width: fit-content;
	}

	.fa-trash {
		color: salmon;
	}

	.hidden {
		display: none;
	}
</style>
