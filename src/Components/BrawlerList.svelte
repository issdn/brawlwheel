<script lang="ts">
	import { brawlerStore, type BrawlerNames } from '../Stores/brawlerStore';
	import BrawlerName from './BrawlerName.svelte';

	let widestName = 100;

	export let brawlerNames: BrawlerNames;
	const setNameWidth = (width: number) => {
		if (width > widestName) {
			widestName = width;
		}
	};
</script>

<div class="h-full w-full text-3xl flex flex-col items-center border-2 border-black">
	<div class="bg-black text-2xl w-full px-8">
		<span class="default-text">Click on brawler's name to remove it from the wheel.</span>
	</div>
	<ul
		style={`grid-template-columns: repeat(auto-fit, minmax(${widestName.toFixed()}px, 1fr));`}
		class={`grid h-full w-full gap-x-4 overflow-y-auto overflow-x-hidden  p-8`}
	>
		{#each brawlerNames as brawlerName}
			<li>
				<BrawlerName
					{setNameWidth}
					removeBrawler={brawlerStore.removeWord}
					addBrawler={brawlerStore.addWord}
					name={brawlerName}
				/>
			</li>
		{/each}
	</ul>
</div>
