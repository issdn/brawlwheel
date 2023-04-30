import { writable } from 'svelte/store';

const createStore = () => {
	const { subscribe, set } = writable<string | null>(null);

	const addDialog = (content: string) => {
		set(content);
	};

	const closeDialog = () => {
		set(null);
	};

	return {
		subscribe,
		addDialog,
		closeDialog
	};
};

const dialogContext = createStore();
export default dialogContext;
