<script lang="ts">
	import Button from './Button.svelte';

	type T = $$Generic<string>;

	export let componentLabels: T[];
	export let currentLabel: string;
	export let setActiveComponent: (label: T) => void;
</script>

<div class="flex flex-row bg-black/50 p-2 gap-x-2">
	{#each componentLabels as label, i}
		<Button
			color={label === currentLabel ? 'orange' : 'black'}
			onClick={() => setActiveComponent(label)}
		>
			{label}
		</Button>
	{/each}
	<slot />
</div>
