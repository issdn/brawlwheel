<script lang="ts">
	import { isAnimating } from '../Stores/pageContextStore';

	type name = string;
	type addBrawler = (name: string) => void;
	type removeBrawler = (name: string) => void;

	export let name: name;
	export let addBrawler: addBrawler;
	export let removeBrawler: removeBrawler;

	let active = true;

	const handleBrawlerNameClick = () => {
		if ($isAnimating) return;
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
</script>

<button
	disabled={$isAnimating}
	class={`${$isAnimating && 'cursor-default'} ${
		!active ? 'opacity-25' : $isAnimating ? 'opacity-75' : 'opacity-100'
	} text-2xl xl:text-3xl`}
	on:click={handleBrawlerNameClick}>{name}</button
>
