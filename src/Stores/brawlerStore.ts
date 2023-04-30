import { writable } from 'svelte/store';

type BrawlerName = string;
export type BrawlerNames = BrawlerName[];

const createBrawlerStore = (brawlerNames: BrawlerNames = []) => {
	const { subscribe, set: _set, update } = writable<BrawlerNames>(brawlerNames);

	const addWord = (brawlerName: string) => {
		update((brawlerNames) => {
			if (brawlerNames.includes(brawlerName)) return brawlerNames;
			else return [...brawlerNames, brawlerName];
		});
	};

	const removeWord = (brawlerName: string) => {
		update((brawlerNames) => brawlerNames.filter((w) => w !== brawlerName));
	};

	const set = (brawlerNames: BrawlerNames) => {
		_set(brawlerNames);
	};

	return {
		subscribe,
		set,
		addWord,
		removeWord
	};
};

export const brawlerStore = createBrawlerStore();

export type GadgetsByBrawler = {
	[k: string]: string[];
};
export const gadgetsByBrawler = writable<GadgetsByBrawler>();

export type StarpowersByBrawler = {
	[k: string]: string[];
};
export const starpowersByBrawler = writable<StarpowersByBrawler>();
