import { writable } from 'svelte/store';

const createSettingsStore = () => {
	const { subscribe, update } = writable({
		withGadgets: true,
		withStarPowers: true
	});

	const toggleGadgets = () => {
		update((settings) => {
			return {
				...settings,
				withGadgets: !settings.withGadgets
			};
		});
	};

	const toggleStarPowers = () => {
		update((settings) => {
			return {
				...settings,
				withStarPowers: !settings.withStarPowers
			};
		});
	};

	return {
		subscribe,
		toggleGadgets,
		toggleStarPowers
	};
};

export const settings = createSettingsStore();

export const checkboxStore = (defaultValue = false) => {
	const { subscribe, update } = writable(defaultValue);

	const toggle = () => {
		update((value) => !value);
	};

	return {
		subscribe,
		toggle
	};
};
