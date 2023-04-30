import { writable } from 'svelte/store';
import type WheelRenderer from '../Components/wheelRenderer';

type Words = string[];

const wheelStore = (words: Words = []) => {
	const { subscribe: subscribeWords, set: _setWords } = writable<Words>(words);
	const {
		subscribe: subscribeWheelRenderer,
		set: setWheelRenderer,
		update: updateWheelRenderer
	} = writable<WheelRenderer | null>(null);

	const { subscribe: subscribeIsAnimating, set: setIsAnimating } = writable<boolean>(false);

	const setIsAnimatingFalse = () => setIsAnimating(false);
	const setIsAnimatingTrue = () => setIsAnimating(true);

	let isAnimating: boolean;

	const checkIfValid = () => {
		subscribeIsAnimating((isAn) => (isAnimating = isAn));
		if (isAnimating) return false;
		else return true;
	};

	const addWord = (word: string) => {
		if (!checkIfValid()) return;
		updateWheelRenderer((wheelRenderer) => {
			if (!wheelRenderer) return wheelRenderer;
			wheelRenderer.words = [...wheelRenderer.words, word];
			return wheelRenderer;
		});
	};

	const removeWord = (word: string) => {
		if (!checkIfValid()) return;
		updateWheelRenderer((wheelRenderer) => {
			if (!wheelRenderer) return wheelRenderer;
			if (wheelRenderer.words.length === 1) throw new Error('Cannot remove last word');
			wheelRenderer.words = wheelRenderer.words.filter((w) => w !== word);
			return wheelRenderer;
		});
	};

	const setWords = (words: Words) => {
		_setWords(words);
		updateWheelRenderer((wheelRenderer) => {
			if (!wheelRenderer) return wheelRenderer;
			wheelRenderer.words = words;
			return wheelRenderer;
		});
	};

	return {
		subscribeWheelRenderer,
		subscribeWords,
		setWheelRenderer,
		setWords,
		addWord,
		removeWord,
		subscribeIsAnimating,
		setIsAnimatingFalse,
		setIsAnimatingTrue
	};
};

const wheel = wheelStore();

export default wheel;
