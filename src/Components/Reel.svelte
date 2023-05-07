<script lang="ts">
	import { slide } from 'svelte/transition';
	import { settings } from '../Stores/settingsStore';
	import { gadgetsAndStarPowersByBrawler } from '../Stores/brawlerStore';
	import { onMount } from 'svelte';

	const shuffle = (possibilities: string[]) => {
		const array = [...possibilities];
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const time = 200;

	export let setFinishedTrue: () => void;
	export let setSpinFunction: (reset: () => void) => void;
	export let possibilities: string[];
	possibilities = shuffle(possibilities);

	let loops: number = -1;
	let winner: string | null = null;
	let randomGadget: string | null = null;
	let randomStarPower: string | null = null;
	let current = 0;

	$: if (winner) {
		const { gadget, starPower } = gadgetsAndStarPowersByBrawler.getRandomGadgetAndStarPower(
			winner,
			$settings.withGadgets.checked,
			$settings.withStarPowers.checked
		);
		randomGadget = gadget;
		randomStarPower = starPower;
	}

	let interval: ReturnType<typeof setInterval>;

	const loop = () => {
		current = (current + 1) % possibilities.length;
		loops--;
		if (loops === 0) {
			loops = -1;
			winner = possibilities[current];
			setFinishedTrue();
			interval && clearInterval(interval);
		}
	};

	onMount(() => {
		setSpinFunction(() => {
			possibilities = shuffle(possibilities);
			winner = null;
			loops = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
			current = 0;
			loop();
			interval = setInterval(loop, time);
		});
	});
</script>

<div class="relative min-h-[5.80rem] flex flex-col justify-center">
	{#if possibilities}
		{#key current}
			<span class="md:text-3xl uppercase" in:slide out:slide|local>
				{possibilities[current]}
			</span>
		{/key}
	{/if}
	{#if winner}
		{#if randomGadget}
			<span in:slide={{ delay: time }} out:slide|local class="md:text-xl">
				{randomGadget}
			</span>
		{/if}
		{#if randomStarPower}
			<span in:slide={{ delay: time }} out:slide|local class="md:text-xl">
				{randomStarPower}
			</span>
		{/if}
	{/if}
</div>
