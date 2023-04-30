import { writable } from 'svelte/store';

export type WheelWinner = {
	name: string;
	gadget?: string;
	starPower?: string;
};

type DialogTypes = {
	type: 'wheelWinner';
	data: WheelWinner;
};

const createStore = () => {
	const { subscribe, set } = writable<DialogTypes | null>(null);

	const addDialog = (content: DialogTypes) => {
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

export const dialogContext = createStore();
