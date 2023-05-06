<script lang="ts">
	import BrawlerList from '../Components/BrawlerList.svelte';
	import { getBrawlerNames } from '../Components/brawlersFunctions';
	import { brawlinfo, brawlevents } from '../Components/brawlinfo';
	import DialogContainer from '../Components/DialogContainer.svelte';
	import { brawlerStore, gadgetsAndStarPowersByBrawler } from '../Stores/brawlerStore';
	import Settings from '../Components/Settings.svelte';
	import Wheel from '../Components/Wheel.svelte';
	import ComponentTab from '../Components/ComponentTab.svelte';
	import type { SvelteComponent } from 'svelte';
	import { eventStore } from '../Stores/eventStore';
	import Squads from '../Components/Squads.svelte';
	import { settings } from '../Stores/settingsStore';
	import { allBrawlEvents } from '../Components/allBrawlEvents';

	type Components = {
		[k: string]: { component: typeof SvelteComponent; props: { [k: string]: unknown } };
	};

	const setActiveComponent = (label: string) => {
		currentLabel = label;
	};

	const brawlerNames = getBrawlerNames(brawlinfo.items);
	brawlerStore.set(brawlerNames);

	$: $settings.allowUnavailibleEvents.checked
		? eventStore.setFromStringArray(allBrawlEvents)
		: eventStore.setFromEventArray(brawlevents);

	gadgetsAndStarPowersByBrawler.set(brawlinfo.items);

	const components = {
		Slots: { component: Squads, props: {} },
		Wheel: { component: Wheel, props: {} }
	} as Components;

	const componentLabels = Object.keys(components);

	$: currentLabel = componentLabels[0];
	$: activeComponent = components[currentLabel];
</script>

<main
	class="font-lilita text-white p-4 xl:p-12 gap-y-4 bg-secondary-gradient flex flex-col w-full min-h-screen md:h-full overflow-hidden"
>
	<div class="flex flex-row justify-center">
		<ComponentTab {currentLabel} {componentLabels} {setActiveComponent} />
	</div>
	<div class="w-full h-full gap-y-12 flex flex-col lg:flex-row gap-x-4 xl:gap-x-12">
		<svelte:component this={activeComponent.component} {...activeComponent.props} />
		<div class="flex flex-col h-full w-full gap-y-2">
			<Settings />
			<BrawlerList {brawlerNames} />
		</div>
	</div>
</main>
<DialogContainer />
