<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	export let open: boolean;
	export let style = '';
</script>

{#if open}
	<div
		transition:slide
		class={`absolute left-1/2 -translate-x-1/2 bottom-0 h-screen w-full xl:w-1/2 p-8`}
	>
		<div
			class={`${style} bg-black rounded-3xl h-full w-full p-8 flex flex-col gap-y-8 items-center`}
		>
			<slot />
		</div>
	</div>
{/if}
