<script lang="ts">
	import Button from './Button.svelte';
	import Reel from './Reel.svelte';
	import { slots } from '../Stores/slotsStore';

	export let label: string;
	export let numberOfReels = 3;
	export let possibilities: string[];

	const _slots = slots(numberOfReels);
</script>

<div class="flex flex-col">
	<span class="w-full bg-black uppercase default-text px-8 py-1">{label}</span>
	<fieldset class="border-2 border-black py-8 relative">
		<div
			class="w-full flex flex-row justify-center absolute -bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
		>
			<Button
				size="lg"
				attributes={{ disabled: !$_slots.every((reel) => reel.finished) }}
				onClick={_slots.spin}>Spin</Button
			>
		</div>
		<table class="gap-x-2 w-full table-fixed">
			<tr>
				{#each $_slots as _, i}
					<td class="text-center">
						<Reel
							setFinishedTrue={() => _slots.setFinishedTrue(i)}
							setSpinFunction={(spin) => _slots.setSpinFunction(spin, i)}
							{possibilities}
						/>
					</td>
				{/each}
			</tr>
		</table>
	</fieldset>
</div>
