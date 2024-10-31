<script>
	export let checked = false;
	export let onclick;
	export let style;

	function toggleChecked() {
		checked = !checked;

		return onclick();
	}
</script>

<i class:checked class="fa-regular fa-square-check" onclick={toggleChecked} style={style}></i>

<style>
	i {
		background-color: #999999;
		color: #999999;
		margin: auto;
		transform: scale(1.3, 1.3);
	}

	i:hover {
		background-color: #666666;
		color: #44BBAA;
	}

	.checked {
		background-color: #333333;
		color: #229988;
	}
</style>
