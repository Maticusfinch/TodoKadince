<script>
	import {formatTimestamp} from "../utilities/DateUtil.js";

	export let completedTimestamp;
	export let task;
	let completed;

	function toggleTaskCompletion() {
		completedTimestamp = completed ? null : Date.now();
	}
</script>

<input type="checkbox" bind:checked={completed} onclick={toggleTaskCompletion} />
<span>{task + (completedTimestamp ? " (Completed on: " + formatTimestamp(completedTimestamp) + ")" : "")}</span>
