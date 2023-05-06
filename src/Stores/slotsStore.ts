import { writable } from 'svelte/store';

type Reel = { finished: boolean; spin: () => void };
type Reels = Reel[];

export const slots = (numberOfReels: number) => {
	const { subscribe, update } = writable<Reels>(
		Array(numberOfReels).fill({ finished: true, spin: () => null })
	);

	const setSpinFunction = (spinFunction: Reel['spin'], index: number) => {
		update((reels) =>
			reels.map((reel, i) => {
				if (i === index) {
					return { ...reel, spin: spinFunction };
				}
				return reel;
			})
		);
	};

	const setFinishedTrue = (index: number) => {
		update((reels) =>
			reels.map((reel, i) => {
				if (i === index) {
					return { ...reel, finished: true };
				}
				return reel;
			})
		);
	};

	const spin = () => {
		update((reels) =>
			reels.map((reel) => {
				reel.spin();
				return { ...reel, finished: false };
			})
		);
	};

	return {
		setSpinFunction,
		setFinishedTrue,
		spin,
		subscribe
	};
};
