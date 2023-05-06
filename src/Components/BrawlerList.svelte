<script lang="ts">
	import { brawlerStore, type BrawlerNames } from '../Stores/brawlerStore';
	import BrawlerName from './BrawlerName.svelte';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	let widestName = 100;

	export let hidden = false;
	export let brawlerNames: BrawlerNames;
	const setNameWidth = (width: number) => {
		if (width > widestName) {
			widestName = width;
		}
	};
</script>

<div class="h-full w-full flex flex-col items-center border-2 border-black">
	<div class="bg-black w-full px-2 md:px-8 flex flex-row justify-between">
		<span>Click on brawler's name to remove it from the wheel.</span>
		<Button size="none" color="clear" onClick={() => (hidden = !hidden)}
			><Icon
				style={`${hidden ? 'rotate-180' : 'rotate-0'} text-xl align-middle`}
				icon="expand_more"
			/></Button
		>
	</div>
	<ul
		style={`grid-template-columns: repeat(auto-fit, minmax(${widestName.toFixed()}px, 1fr));`}
		class={`${
			hidden ? 'hidden' : 'grid'
		} text-xl h-full w-full gap-x-4 overflow-y-auto overflow-x-hidden p-8`}
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
