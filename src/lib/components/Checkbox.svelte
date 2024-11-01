<script>
	export let checked = false;
	export let onclick;
	export let style;

	function toggleChecked() {
		checked = !checked;

		return onclick();
	}
</script>

<i class:checked class="fa-solid fa-check" onclick={toggleChecked} style={style}></i>

<style>
	i {
		background-color: #222222;
		border: solid 1px #222222;
		border-radius: 2px;
		color: #222222;
		transform: scale(1.3, 1.3);
		z-index: 2;
	}

	i:hover {
		background-color: #666666;
		border-color: #666666;
		color: #44BBAA;
	}

	.checked {
		border-color: #229988;
		background-color: #333333;
		color: #229988;
	}
</style>
