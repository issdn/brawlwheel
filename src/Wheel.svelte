<script lang="ts">
	import { onMount } from 'svelte';
	import WheelRenderer from './wheelRenderer';

	type brawlerNames = string[];
	export let brawlerNames: brawlerNames;

	let error: string | null = null;
	let wheel: WheelRenderer | null = null;
	let isAnimating = false;
	let winner = 0;

	let canvasBinding: HTMLCanvasElement;

	const setIsAnimatingFalse = () => (isAnimating = false);
	const setIsAnimatingTrue = () => (isAnimating = true);

	const handleWheelClick = () => {
		if (wheel) {
			if (!isAnimating) {
				const newWinner = wheel.spin();
				winner = newWinner;
			}
		}
	};

	onMount(() => {
		if (canvasBinding) {
			try {
				wheel = new WheelRenderer(canvasBinding, brawlerNames, {
					onAnimationStart: setIsAnimatingTrue,
					onAnimationEnd: setIsAnimatingFalse
				});
				var resize = wheel.resize;
				wheel.preDraw();
				window.addEventListener('resize', resize);
				wheel = wheel;
			} catch (e) {
				if (e instanceof Error) {
					error = e.message;
				} else {
					error = 'Something went wrong';
				}
			}
		}
		return () => window.removeEventListener('resize', resize);
	});
</script>

{#if error}
	<span>{error}</span>
{:else}
	<canvas
		bind:this={canvasBinding}
		style={`cursor:${isAnimating ? 'default' : 'pointer'};`}
		on:click={handleWheelClick}
	/>
{/if}
