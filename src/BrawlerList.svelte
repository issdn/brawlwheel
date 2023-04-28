<script lang="ts">
	import BrawlerName from './BrawlerName.svelte';

	type brawlerNames = string[];
	type addBrawler = (name: string) => void;
	type removeBrawler = (name: string) => void;

	export let brawlerNames: brawlerNames;
	export let addBrawler: addBrawler;
	export let removeBrawler: removeBrawler;

	let widestName = 100;

	const setNameWidth = (width: number) => {
		if (width > widestName) {
			widestName = width;
		}
	};
</script>

<div class="h-full w-full text-4xl flex flex-row justify-center">
	<ul
		style={`grid-template-columns: repeat(auto-fit, minmax(${widestName.toFixed()}px, 1fr));`}
		class={`grid h-full gap-x-4 overflow-y-auto overflow-x-hidden w-full border-2 border-black p-8`}
	>
		{#each brawlerNames as brawlerName, index}
			<BrawlerName {setNameWidth} {removeBrawler} {addBrawler} name={brawlerName} />
		{/each}
	</ul>
</div>
