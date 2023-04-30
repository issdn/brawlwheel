<script lang="ts">
	import CloseButton from './CloseButton.svelte';
	import { clickOutside } from './dialog_actions';

	export let onClose: () => void;
</script>

<div
	class="bg-brawl-yellow py-4 px-8 flex flex-col gap-y-4 border-2 border-black drop-shadow-brawl box-border"
	use:clickOutside
	on:clickoutside={onClose}
>
	<div class="flex flex-row justify-end">
		<CloseButton {onClose} />
	</div>
	<slot />
</div>
