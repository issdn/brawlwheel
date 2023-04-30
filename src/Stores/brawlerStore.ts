import { writable } from 'svelte/store';

type Words = string[];

const createBrawlerStore = (words: Words = []) => {
	const { subscribe: subscribeWords, set: _setWords } = writable<Words>(words);
};
