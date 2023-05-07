<script lang="ts">
	import { brawlerStore } from '../Stores/brawlerStore';
	import { eventStore } from '../Stores/eventStore';
	import { settings } from '../Stores/settingsStore';
	import Slot from './Slot.svelte';
	import Spinner from './Spinner.svelte';
	import { allBrawlEvents } from './allBrawlEvents';
	import type { Events } from './brawlersFunctions';

	let events: Events;
	let error = false;

	const fetchMaps = async () => {
		const response = await fetch('/events');
		const data = await response.json();
		console.log(response);
		if (response.ok) {
			events = data.events;
		} else {
			error = true;
		}
	};

	$: if ($eventStore) {
		fetchMaps();
	}

	$: if (error) {
		eventStore.setFromStringArray(allBrawlEvents);
	} else if (events) {
		$settings.allowUnavailibleEvents.checked
			? eventStore.setFromStringArray(allBrawlEvents)
			: eventStore.setFromEventArray(events);
	}
</script>

<div class="flex flex-col gap-y-12 w-full h-full">
	<Slot
		disabled={!$brawlerStore.length}
		label="Brawlers"
		numberOfReels={3}
		possibilities={$brawlerStore}
	/>
	{#if !events && !$eventStore.length}
		<Spinner size="lg" />
	{:else}
		<Slot
			disabled={!$eventStore.length}
			label="Map"
			numberOfReels={1}
			possibilities={$eventStore}
		/>
	{/if}
</div>
