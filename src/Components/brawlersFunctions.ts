type Brawler = {
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
type Brawlers = Brawler[];

export const getBrawlerNames = (brawlers: Brawlers) => brawlers.map((brawler) => brawler.name);
