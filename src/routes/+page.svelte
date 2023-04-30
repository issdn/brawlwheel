<script lang="ts">
	import Wheel from '../Components/Wheel.svelte';
	import BrawlerList from '../Components/BrawlerList.svelte';
	import { getBrawlerNames } from '../Components/brawlersFunctions';
	import { brawlinfo } from '../Components/brawlinfo';
	import DialogContainer from '../Components/DialogContainer.svelte';
	import { brawlerStore, gadgetsByBrawler, starpowersByBrawler } from '../Stores/brawlerStore';
	import Settings from '../Components/Settings.svelte';

	const brawlerNames = getBrawlerNames(brawlinfo.items);
	brawlerStore.set(brawlerNames);

	try {
		gadgetsByBrawler.set(
			brawlinfo.items.reduce((acc: { [key: string]: string[] }, brawler) => {
				acc[brawler.name] = brawler.gadgets.map((gadget) => gadget.name);
				return acc;
			}, {})
		);
	} catch {}

	try {
		starpowersByBrawler.set(
			brawlinfo.items.reduce((acc: { [key: string]: string[] }, brawler) => {
				acc[brawler.name] = brawler.starPowers.map((starpower) => starpower.name);
				return acc;
			}, {})
		);
	} catch {}
</script>

<main
	class="p-12 gap-x-12 gap-y-12 bg-secondary-gradient flex flex-col w-full lg:flex-row lg:h-full overflow-x-hidden"
>
	<Wheel />
	<div class="flex flex-col h-full w-full gap-y-2">
		<Settings />
		<BrawlerList {brawlerNames} />
	</div>
</main>
<DialogContainer />
