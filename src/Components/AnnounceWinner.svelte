<script lang="ts">
	export let name: string;
	export let gadget: string | null = null;
	export let starPower: string | null = null;
</script>

<div>
	<h1 class="text-3xl font-bold text-center text-shadow-sm">
		The winner is <b class="text-brawl-violet">{name}</b>!
	</h1>
	{#if gadget}
		<h2 class="text-2xl font-bold text-center text-shadow-sm">Gadget: {gadget}</h2>
	{/if}
	{#if starPower}
		<h2 class="text-2xl font-bold text-center text-shadow-sm">Star Power: {starPower}</h2>
	{/if}
</div>
