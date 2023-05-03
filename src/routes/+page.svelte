<script lang="ts">
	import BrawlerList from '../Components/BrawlerList.svelte';
	import { getBrawlerNames } from '../Components/brawlersFunctions';
	import { brawlinfo } from '../Components/brawlinfo';
	import DialogContainer from '../Components/DialogContainer.svelte';
	import { brawlerStore, gadgetsAndStarPowersByBrawler } from '../Stores/brawlerStore';
	import Settings from '../Components/Settings.svelte';
	import Squads from '../Components/Squads.svelte';
	import Wheel from '../Components/Wheel.svelte';
	import ComponentTab from '../Components/ComponentTab.svelte';

	const components = {
		Squads: Squads,
		Wheel: Wheel
	};
	const componentLabels = Object.keys(components) as Array<keyof typeof components>;

	$: activeComponent = componentLabels[0];

	const setActiveComponent = (label: keyof typeof components) => {
		activeComponent = label;
	};

	const brawlerNames = getBrawlerNames(brawlinfo.items);
	brawlerStore.set(brawlerNames);

	gadgetsAndStarPowersByBrawler.set(
		brawlinfo.items.map((brawler) => {
			return {
				name: brawler.name,
				gadgets: brawler.gadgets.map((gadget) => gadget.name),
				starPowers: brawler.starPowers.map((starpower) => starpower.name)
			};
		})
	);
</script>

<main
	class="p-4 md:p-12 gap-y-4 bg-secondary-gradient flex flex-col w-full lg:h-full overflow-hidden"
>
	<div class="flex flex-row justify-center">
		<ComponentTab {activeComponent} {componentLabels} {setActiveComponent} />
	</div>
	<div class="w-full h-full gap-y-12 flex flex-col md:flex-row gap-x-4">
		<svelte:component this={components[activeComponent]} />
		<div class="flex flex-col h-full w-full gap-y-2">
			<Settings />
			<BrawlerList {brawlerNames} />
		</div>
	</div>
</main>
<DialogContainer />
