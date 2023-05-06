import { writable } from 'svelte/store';
import { getEventModes, type Event, type Events } from '../Components/brawlersFunctions';

const createEventStore = () => {
	const { subscribe, set: _set } = writable<Event['event']['mode'][]>([]);

	const setFromStringArray = (events: string[]) => {
		_set(events);
	};

	const setFromEventArray = (events: Events) => {
		_set(getEventModes(events));
	};

	return {
		subscribe,
		setFromEventArray,
		setFromStringArray
	};
};

export const eventStore = createEventStore();
