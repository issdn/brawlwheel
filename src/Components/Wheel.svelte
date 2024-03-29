<script lang="ts">
	import { onMount } from 'svelte';
	import WheelRenderer from './wheelRenderer';
	import { brawlerStore, gadgetsAndStarPowersByBrawler } from '../Stores/brawlerStore';
	import { isAnimating } from '../Stores/pageContextStore';
	import { settings } from '../Stores/settingsStore';
	import { dialogContext } from '../Stores/dialogStore';
	import Spinner from './Spinner.svelte';

	let canvasBinding: HTMLCanvasElement;
	let error: string | null = null;
	let wheelRenderer: WheelRenderer | null = null;
	let wheelDrawn = false;

	$: if (wheelRenderer && wheelDrawn) {
		wheelRenderer.words = $brawlerStore;
	}

	const handleWheelClick = () => {
		if (wheelRenderer) {
			if (!$isAnimating && $brawlerStore.length) {
				wheelRenderer.spin();
			}
		}
	};

	const announceWinner = (winner: string) => {
		try {
			const brawlerObj = gadgetsAndStarPowersByBrawler.getRandomGadgetAndStarPower(
				winner,
				$settings.withGadgets.checked,
				$settings.withStarPowers.checked
			);
			dialogContext.addDialog({ type: 'wheelWinner', data: brawlerObj });
		} catch {
			error = "Brawler's list incomplete. Please refresh or report this issue.";
		}
	};

	onMount(() => {
		if (canvasBinding) {
			try {
				wheelRenderer = new WheelRenderer(canvasBinding, $brawlerStore, {
					onAnimationStart: isAnimating.setTrue,
					onAnimationEnd: isAnimating.setFalse,
					announceWinner: announceWinner
				});
				wheelRenderer.preDraw().then(() => {
					wheelDrawn = true;
				});
				var resize = wheelRenderer.resize;
				window.addEventListener('resize', resize);
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
	<div id="wheelCanvasContainer" class="relative h-full w-full">
		{#if !wheelDrawn}
			<Spinner size="lg" />
		{/if}
		<canvas
			on:keydown={(e) => {
				if (e.key === 'Space') {
					handleWheelClick();
				}
			}}
			style={`cursor:${$isAnimating || !$brawlerStore.length ? 'default' : 'pointer'};`}
			on:click={handleWheelClick}
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			bind:this={canvasBinding}
		/>
	</div>
{/if}
