import { writable } from 'svelte/store';

const createIsAnimating = () => {
	const { subscribe, set } = writable(false);

	const setFalse = () => set(false);
	const setTrue = () => set(true);

	return {
		subscribe,
		setFalse,
		setTrue
	};
};

export const isAnimating = createIsAnimating();
