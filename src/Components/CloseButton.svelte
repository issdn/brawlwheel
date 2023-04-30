<script lang="ts">
	export let onClose: () => void;
</script>

<button
	on:click={onClose}
	class="close-button-border w-fit bg-black border-2 border-b-4 border-black flex flex-row justify-center items-center hover:border-b-2 hover:mb-0.5"
>
	<div class="close-button w-6 h-6 bg-white" />
</button>
