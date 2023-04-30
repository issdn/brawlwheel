<script lang="ts">
	import { settings } from '../Stores/settingsStore';
	import Checkbox from './Checkbox.svelte';
</script>

<div class="text-xl flex flex-row gap-x-2">
	<Checkbox
		label="Starpower"
		toggle={settings.toggleStarPowers}
		checked={$settings.withStarPowers}
	/>
	<Checkbox label="Gadget" toggle={settings.toggleGadgets} checked={$settings.withGadgets} />
</div>
