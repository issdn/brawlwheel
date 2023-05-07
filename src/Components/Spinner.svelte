<script lang="ts">
	const sizes = {
		sm: 'h-4 w-4 border-2',
		md: 'h-6 w-6 border-4',
		lg: 'h-16 w-16 border-8'
	};
	export let size: keyof typeof sizes = 'md';
	export let style = '';
</script>

<div class="w-full h-full flex flex-row justify-center items-center">
	<span
		class={`${sizes[size]} ${style} rounded-full border-b-gray-900/70 border-gray-900/25 inline-block box-border animate-spin`}
	/>
</div>
