export type Brawler = {
	name: string;
	id: number;
	starPowers: {
		name: string;
		id: number;
	}[];
	gadgets: {
		name: string;
		id: number;
	}[];
};

export type Brawlers = Brawler[];

export type Event = {
	startTime: string;
	endTime: string;
	slotId: number;
	event: {
		id: number;
		mode: string;
		map: string;
	};
};

export type Events = Event[];

export const getBrawlerNames = (brawlers: Brawlers) => brawlers.map((brawler) => brawler.name);

export const getEventMapNames = (events: Event[]) => events.map((event) => event.event.map);
export const getEventModes = (events: Event[]) =>
	events.map((event) => splitByCapitalLetters(event.event.mode));

const splitByCapitalLetters = (string: string) => string.split(/(?=[A-Z])/).join(' ');
