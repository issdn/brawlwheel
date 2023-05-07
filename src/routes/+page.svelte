<script lang="ts">
	import BrawlerList from '../Components/BrawlerList.svelte';
	import { getBrawlerNames, type Brawlers } from '../Components/brawlersFunctions';
	import { brawlinfo } from '../Components/brawlinfo';
	import DialogContainer from '../Components/DialogContainer.svelte';
	import { brawlerStore, gadgetsAndStarPowersByBrawler } from '../Stores/brawlerStore';
	import Settings from '../Components/Settings.svelte';
	import Wheel from '../Components/Wheel.svelte';
	import ComponentTab from '../Components/ComponentTab.svelte';
	import type { SvelteComponent } from 'svelte';
	import Squads from '../Components/Squads.svelte';
	import Button from '../Components/Button.svelte';
	import Icon from '../Components/Icon.svelte';
	import Drawer from '../Components/Drawer.svelte';

	export let data;

	type Components = {
		[k: string]: { component: typeof SvelteComponent; props: { [k: string]: unknown } };
	};

	const setActiveComponent = (label: string) => {
		currentLabel = label;
	};

	let brawlers: Brawlers;
	if (!data.hasOwnProperty('brawlers') || !data.brawlers) {
		brawlers = brawlinfo.items;
	} else {
		brawlers = data.brawlers;
	}

	const brawlerNames = getBrawlerNames(brawlers);
	brawlerStore.set(brawlerNames);

	gadgetsAndStarPowersByBrawler.set(brawlers);

	const components = {
		Wheel: { component: Wheel, props: {} },
		Slots: { component: Squads, props: {} }
	} as Components;

	const componentLabels = Object.keys(components);

	$: currentLabel = componentLabels[0];
	$: activeComponent = components[currentLabel];

	let drawerOpen = false;
</script>

<main
	class="font-lilita text-white p-4 xl:py-8 px-8 md:px-[10%] lg:px-[15%] xl:px-[25%] gap-y-8 bg-secondary-gradient flex flex-col w-full min-h-screen md:h-full overflow-hidden"
>
	<div class="flex flex-row justify-center">
		<img src="./logo.webp" alt="brawl hub logo" class="h-16" />
	</div>
	<svelte:component this={activeComponent.component} {...activeComponent.props} />
	<div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
		<ComponentTab {componentLabels} {setActiveComponent} {currentLabel}>
			<Button
				style="flex flex-col justify-center items-center"
				size="square"
				onClick={() => (drawerOpen = !drawerOpen)}
				><Icon style={`text-xl align-middle`} icon="settings" /></Button
			>
		</ComponentTab>
	</div>
	<Drawer open={drawerOpen} style="pb-12">
		<Settings />
		<BrawlerList {brawlerNames} />
	</Drawer>
</main>
<DialogContainer />
