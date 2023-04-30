<script lang="ts">
	import Dialog from './Dialog.svelte';
	import { dialogContext } from '../Stores/dialogStore';
	import AnnounceWinner from './AnnounceWinner.svelte';

	const types = {
		wheelWinner: AnnounceWinner
	};
</script>

<div class="absolute top-0 left-0 h-screen w-screen pointer-events-none overflow-x-hidden">
	{#if $dialogContext}
		<div class="h-full w-full pointer-events-auto">
			<div
				class="h-full w-full bg-black/50 py-4 px-8 gap-y-2 flex flex-col justify-center items-center"
			>
				<Dialog onClose={dialogContext.closeDialog}>
					<svelte:component this={types[$dialogContext.type]} {...$dialogContext.data} />
				</Dialog>
			</div>
		</div>
	{/if}
</div>
