<script lang="ts">
	import Wheel from '../Wheel.svelte';
	import BrawlerList from '../BrawlerList.svelte';
	import { getBrawlerNames } from '../brawlersFunctions';
	import { brawlinfo } from '../brawlinfo';

	const brawlers = getBrawlerNames(brawlinfo.items);
	let brawlersToSpin = brawlers;

	const removeBrawler = (name: string) =>
		(brawlersToSpin = brawlersToSpin.filter((n) => n !== name));

	const addBrawler = (name: string) => (brawlersToSpin = [...brawlersToSpin, name]);
</script>

<main class="p-12 gap-x-12 bg-secondary-gradient flex flex-col lg:flex-row gap-y-2 h-full">
	<Wheel brawlerNames={brawlersToSpin} />
	<BrawlerList brawlerNames={brawlers} {addBrawler} {removeBrawler} />
</main>
