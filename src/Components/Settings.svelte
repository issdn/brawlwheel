<script lang="ts">
	import { settings, type Settings } from '../Stores/settingsStore';
	import Checkbox from './Checkbox.svelte';

	const getEntries = (obj: Settings) => {
		return Object.entries(obj).map(([name, setting]) => {
			return [name, setting] as [keyof Settings, typeof setting];
		});
	};
</script>

<div class="flex flex-col gap-y-1 sm:flex-row gap-x-2">
	{#each getEntries($settings) as [name, setting]}
		<Checkbox
			label={setting.label}
			toggle={() => settings.toggle(name)}
			checked={setting.checked}
		/>
	{/each}
</div>
