<script lang="ts">
	const sizes = {
		sm: 'py-1 px-4 text-sm',
		md: 'py-2 px-8 text-lg',
		lg: 'py-2 px-16 text-xl'
	};

	const colors = {
		black: 'bg-gray-800 before:bg-gray-700 after:bg-gray-900',
		orange: 'bg-orange-500 before:bg-orange-400 after:bg-orange-600'
	};

	export let onClick: () => void;
	export let attributes: Record<string, string | boolean | number> = {};
	export let size: keyof typeof sizes = 'md';
	export let color: keyof typeof colors = 'black';
	export let style = '';
</script>

<button
	class={`${style} ${sizes[size]} ${colors[color]} block default-text
		relative before:w-full before:absolute before:top-0 before:left-0 before:h-1
		after:w-full after:absolute after:bottom-0 after:right-0 after:h-1 
		border-b-2 border-black hover:border-none box-border hover:mb-0.5`}
	on:click={onClick}
	{...attributes}
>
	<slot />
</button>
