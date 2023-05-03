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

export type GadgetsAndStarPowersByBrawler = {
	name: string;
	gadgets: string[];
	starPowers: string[];
};

export type GadgetsAndStarPowersByBrawlers = GadgetsAndStarPowersByBrawler[];

const createGadgetsAndStarPowersByBrawlerStore = () => {
	const { subscribe, set, update } = writable<GadgetsAndStarPowersByBrawlers>();

	let _brawlersList: GadgetsAndStarPowersByBrawlers;
	const getRandomGadgetAndStarPower = (
		brawlerName: string,
		gadget: boolean,
		starPower: boolean
	) => {
		type BrawlerObj = { gadget: string | null; starPower: string | null; name: string };
		subscribe((newBrawlersList) => (_brawlersList = newBrawlersList));
		const brawler = _brawlersList.find((brawler) => brawler.name === brawlerName);
		if (!brawler) return { name: brawlerName, gadget: null, starPower: null };
		let brawlerObj: BrawlerObj = { name: brawlerName } as BrawlerObj;
		const randomGadget = brawler.gadgets[Math.floor(Math.random() * brawler.gadgets.length)];
		const randomStarPower =
			brawler.starPowers[Math.floor(Math.random() * brawler.starPowers.length)];
		brawlerObj = { ...brawlerObj, gadget: gadget ? randomGadget : null };
		brawlerObj = { ...brawlerObj, starPower: starPower ? randomStarPower : null };
		return brawlerObj;
	};

	return {
		subscribe,
		set,
		update,
		getRandomGadgetAndStarPower
	};
};

export const gadgetsAndStarPowersByBrawler = createGadgetsAndStarPowersByBrawlerStore();
