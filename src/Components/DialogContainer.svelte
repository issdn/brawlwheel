<script lang="ts">
	import Dialog from './Dialog.svelte';
	import dialogContext from '../Stores/dialogStore';

	let dialog: string | null;
	dialogContext.subscribe((_dialog) => {
		dialog = _dialog;
	});

	const getSpecialWord = (str: string) => {
		const match = str.match('%(.*?)%');
		if (match) {
			const split = str.split('%' + match[1] + '%');
			return [split[0], match[1], split[1]];
		} else return null;
	};
	let dialogText: string[] | null = null;
	$: if (dialog) {
		dialogText = getSpecialWord(dialog);
	}
</script>

<div class="absolute top-0 left-0 h-screen w-screen pointer-events-none overflow-x-hidden">
	{#if dialog}
		<div class="h-full w-full pointer-events-auto">
			<div
				class="h-full w-full bg-black/50 py-4 px-8 gap-y-2 flex flex-col justify-center items-center"
			>
				<Dialog onClose={dialogContext.closeDialog}>
					{#if dialogText}
						<span class="text-3xl">
							{dialogText[0]}<span class="text-brawl-purple"> {dialogText[1]}</span>{dialogText[2]}
						</span>
					{:else}
						<span class="text-3xl">{dialog}</span>
					{/if}
				</Dialog>
			</div>
		</div>
	{/if}
</div>
