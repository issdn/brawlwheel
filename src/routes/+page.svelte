<script lang="ts">
	import Wheel from '../Components/Wheel.svelte';
	import BrawlerList from '../Components/BrawlerList.svelte';
	import { getBrawlerNames } from '../Components/brawlersFunctions';
	import { brawlinfo } from '../Components/brawlinfo';
	import wheel from '../Stores/wheelStore';
	import DialogContainer from '../Components/DialogContainer.svelte';

	const brawlerNames = getBrawlerNames(brawlinfo.items);
	wheel.setWords(brawlerNames);
</script>

<main
	class="p-12 gap-x-12 gap-y-12 bg-secondary-gradient flex flex-col w-full lg:flex-row lg:h-full overflow-x-hidden"
>
	<Wheel />
	<BrawlerList />
</main>
<DialogContainer />
