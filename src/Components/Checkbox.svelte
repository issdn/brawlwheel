<script lang="ts">
	const sizes = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8'
	} as const;

	export let size: keyof typeof sizes = 'md';
	export let label: string = 'Checkbox';
	export let toggle: () => void;
	export let checked: boolean;
</script>

<label
	on:click={(e) => {
		e.preventDefault();
		toggle();
	}}
	on:keypress={(e) => {
		if (e.key === 'Space') {
			e.preventDefault();
			toggle();
		}
	}}
	class="flex flex-row gap-x-0.5 text-shadow-sm items-center cursor-pointer"
	>{label}
	<input class="invisible w-0" type="checkbox" {checked} />
	<div
		class={`${
			checked ? 'bg-checkbox-gradient-checked' : 'bg-checkbox-gradient'
		} border-2 border-neutral-600 ${sizes[size]} rounded-lg relative`}
	>
		{#if checked}
			<div
				class="absolute clip-checkbox w-4 h-4 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
		{/if}
	</div>
</label>
