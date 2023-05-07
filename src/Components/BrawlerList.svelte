<script lang="ts">
	import { brawlerStore, type BrawlerNames } from '../Stores/brawlerStore';
	import BrawlerName from './BrawlerName.svelte';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	export let brawlerNames: BrawlerNames;
	export let style = '';

	let reverse = false;
	const sortAlphabetically = () => {
		if (reverse) {
			brawlerNames = brawlerNames.sort((a, b) => b.localeCompare(a));
			reverse = false;
		} else {
			brawlerNames = brawlerNames.sort((a, b) => a.localeCompare(b));
			reverse = true;
		}
	};
</script>

<div class={`${style} overflow-y-auto overflow-x-hidden h-full p-4 `}>
	<div>
		<Button onClick={sortAlphabetically} style="bg-gray-900" color="black" size="square">
			<Icon icon="sort_by_alpha" />
		</Button>
	</div>
	<ul class={`text-xl h-full gap-x-4 grid grid-cols-1 sm:grid-cols-3 w-fit mt-2`}>
		{#each brawlerNames as brawlerName}
			<li>
				<BrawlerName
					removeBrawler={brawlerStore.removeWord}
					addBrawler={brawlerStore.addWord}
					name={brawlerName}
				/>
			</li>
		{/each}
	</ul>
</div>
