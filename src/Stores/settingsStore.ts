import { writable } from 'svelte/store';

export type Settings = {
	[k: string]: { checked: boolean; label: string };
};

const createSettingsStore = () => {
	const { subscribe, update } = writable<Settings>({
		withGadgets: { checked: true, label: 'Gadgets' },
		withStarPowers: { checked: true, label: 'Star Powers' },
		allowUnavailibleEvents: { checked: false, label: 'Unavailible Events' }
	});

	const toggle = (key: keyof Settings) => {
		update((settings) => ({
			...settings,
			[key]: { ...settings[key], checked: !settings[key].checked }
		}));
	};

	return {
		subscribe,
		toggle
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
