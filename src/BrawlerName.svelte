<script lang="ts">
	import { onMount } from 'svelte';

	type name = string;
	type addBrawler = (name: string) => void;
	type removeBrawler = (name: string) => void;

	export let name: name;
	export let addBrawler: addBrawler;
	export let removeBrawler: removeBrawler;
	export let setNameWidth: (width: number) => void;

	let textWidthBinding: HTMLButtonElement;
	let active = true;

	const handleBrawlerNameClick = () => {
		if (active) {
			removeBrawler(name);
			active = false;
		} else {
			addBrawler(name);
			active = true;
		}
	};

	onMount(() => {
		const width = textWidthBinding.getBoundingClientRect().width;
		setNameWidth(width);
	});
</script>

<li class={`${active ? 'opacity-100' : 'opacity-25'}`}>
	<button bind:this={textWidthBinding} on:click={handleBrawlerNameClick}>{name}</button>
</li>
