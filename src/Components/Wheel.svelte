<script lang="ts">
	import { onMount } from 'svelte';
	import WheelRenderer from './wheelRenderer';
	import wheel from '../Stores/wheelStore';
	import dialogContext from '../Stores/dialogStore';

	let brawlerNames: string[];
	let error: string | null = null;
	let wheelRenderer: WheelRenderer | null = null;
	let isAnimating = false;

	let canvasBinding: HTMLCanvasElement;

	const handleWheelClick = () => {
		wheel.subscribeIsAnimating((_isAnimating) => (isAnimating = _isAnimating));
		if (wheelRenderer) {
			if (!isAnimating) {
				wheelRenderer.spin();
			}
		}
	};

	onMount(() => {
		if (canvasBinding) {
			try {
				wheel.subscribeWords((_brawlerNames) => (brawlerNames = _brawlerNames));
				wheelRenderer = new WheelRenderer(canvasBinding, brawlerNames, {
					onAnimationStart: wheel.setIsAnimatingTrue,
					onAnimationEnd: wheel.setIsAnimatingFalse,
					announceWinner: (winner) => {
						dialogContext.addDialog(`The winner is %${winner}%!`);
					}
				});
				var resize = wheelRenderer.resize;
				window.addEventListener('resize', resize);
				wheel.setWheelRenderer(wheelRenderer);
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
	<div id="wheelCanvasContainer" class="h-full w-full flex flex-col justify-center">
		<canvas
			bind:this={canvasBinding}
			style={`cursor:${isAnimating ? 'default' : 'pointer'};`}
			on:click={handleWheelClick}
		/>
	</div>
{/if}
