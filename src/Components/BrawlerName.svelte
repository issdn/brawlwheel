<script lang="ts">
	import { onMount } from 'svelte';
	import wheel from '../Stores/wheelStore';

	type name = string;
	type addBrawler = (name: string) => void;
	type removeBrawler = (name: string) => void;

	let isAnimating = false;
	wheel.subscribeIsAnimating((_isAnimating) => (isAnimating = _isAnimating));

	export let name: name;
	export let addBrawler: addBrawler;
	export let removeBrawler: removeBrawler;
	export let setNameWidth: (width: number) => void;

	let textWidthBinding: HTMLButtonElement;
	let active = true;

	const handleBrawlerNameClick = () => {
		if (isAnimating) return;
		if (active) {
			try {
				removeBrawler(name);
				active = false;
			} catch {}
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

<button
	class={`${isAnimating && 'cursor-default'} ${
		!active ? 'opacity-25' : isAnimating ? 'opacity-75' : 'opacity-100'
	}`}
	bind:this={textWidthBinding}
	on:click={handleBrawlerNameClick}>{name}</button
>
