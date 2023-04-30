<script lang="ts">
	import BrawlerName from './BrawlerName.svelte';
	import wheel from '../Stores/wheelStore';

	let brawlerNames: string[] = [];
	wheel.subscribeWords((_brawlerNames) => (brawlerNames = _brawlerNames));

	let widestName = 100;

	const setNameWidth = (width: number) => {
		if (width > widestName) {
			widestName = width;
		}
	};
</script>

<div class="h-full w-full text-4xl flex flex-col items-center border-2 border-black">
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
					removeBrawler={wheel.removeWord}
					addBrawler={wheel.addWord}
					name={brawlerName}
				/>
			</li>
		{/each}
	</ul>
</div>
