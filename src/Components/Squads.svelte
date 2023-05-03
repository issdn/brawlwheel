<script lang="ts">
	import { brawlerStore } from '../Stores/brawlerStore';
	import Button from './Button.svelte';
	import Reel from './Reel.svelte';

	export let numberOfReels = 3;
	let reels = Array(numberOfReels).fill({ finished: true, reset: () => {} });
	$: allFinished = reels.every((reel) => {
		return reel.finished;
	});
</script>

<div class="w-full h-full">
	<div class="w-full flex flex-row justify-center mt-[10%] md:mt-[30%] mb-12">
		<Button
			size="lg"
			attributes={{ disabled: !allFinished }}
			onClick={() => {
				reels = reels.map((reel) => {
					reel.reset();
					return { finished: false, reset: reel.reset };
				});
			}}
		>
			Spin
		</Button>
	</div>
	<table class="gap-x-2 w-full table-fixed">
		<tr>
			{#each reels as _, i}
				<td class="align-top text-center relative">
					<Reel
						setFinishedTrue={() => {
							reels = reels.map((reel, index) => {
								if (index === i) {
									return { ...reel, finished: true };
								}
								return reel;
							});
						}}
						setSpinFunction={(reset) => {
							reels = reels.map((reel, index) => {
								if (index === i) {
									return { ...reel, reset: reset };
								}
								return reel;
							});
						}}
						possibilities={$brawlerStore}
					/>
				</td>
			{/each}
		</tr>
	</table>
</div>
