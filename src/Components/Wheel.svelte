<script lang="ts">
	import { onMount } from 'svelte';
	import WheelRenderer from './wheelRenderer';
	import { brawlerStore } from '../Stores/brawlerStore';
	import { isAnimating } from '../Stores/pageContextStore';
	import { settings } from '../Stores/settingsStore';
	import { brawlinfo } from './brawlinfo';
	import { dialogContext, type WheelWinner } from '../Stores/dialogStore';

	let canvasBinding: HTMLCanvasElement;
	let error: string | null = null;
	let wheelRenderer: WheelRenderer | null = null;

	$: if (wheelRenderer) {
		wheelRenderer.words = $brawlerStore;
	}

	const handleWheelClick = () => {
		if (wheelRenderer) {
			if (!$isAnimating) {
				wheelRenderer.spin();
			}
		}
	};

	const getRandomGadget = (brawlerName: string) => {
		const brawler = brawlinfo.items.find((brawler) => brawler.name === brawlerName);
		if (!brawler) throw new Error('Brawler not found');
		const gadget = brawler.gadgets[Math.floor(Math.random() * brawler.gadgets.length)];
		return gadget.name;
	};

	const getRandomStarPower = (brawlerName: string) => {
		const brawler = brawlinfo.items.find((brawler) => brawler.name === brawlerName);
		if (!brawler) throw new Error('Brawler not found');
		const starpower = brawler.starPowers[Math.floor(Math.random() * brawler.starPowers.length)];
		return starpower.name;
	};

	const announceWinner = (winner: string) => {
		let dialog: WheelWinner = { name: winner };
		try {
			if ($settings.withGadgets) {
				dialog['gadget'] = getRandomGadget(winner);
			}
			if ($settings.withStarPowers) {
				dialog['starPower'] = getRandomStarPower(winner);
			}
			dialogContext.addDialog({ type: 'wheelWinner', data: dialog });
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
	<div id="wheelCanvasContainer" class="relative h-full w-full flex flex-col justify-center">
		<div
			on:keydown={(e) => {
				if (e.key === 'Space') {
					handleWheelClick();
				}
			}}
			style={`cursor:${$isAnimating ? 'default' : 'pointer'};`}
			on:click={handleWheelClick}
			class="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
		/>
		<canvas bind:this={canvasBinding} />
	</div>
{/if}
