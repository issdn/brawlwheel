<script lang="ts">
	import { brawlerStore } from '../Stores/brawlerStore';
	import { eventStore } from '../Stores/eventStore';
	import Slot from './Slot.svelte';
</script>

<div class="flex flex-col gap-y-12 w-full h-full justify-center">
	<Slot label="Brawlers" numberOfReels={3} possibilities={$brawlerStore} />
	<Slot label="Map" numberOfReels={1} possibilities={$eventStore} />
</div>
