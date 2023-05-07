import { BRAWL_API_KEY } from '$env/static/private';
import type { Brawlers } from '../Components/brawlersFunctions';

type ErrorResponse = {
	status: number;
	error: string;
	reason: string;
	detail: string;
};

export const load = async (): Promise<{ brawlers: Brawlers } | ErrorResponse> => {
	const response = await fetch(`https://api.brawlstars.com/v1/brawlers`, {
		headers: {
			Authorization: `Bearer ${BRAWL_API_KEY}`
		}
	});
	const data = await response.json();
	if (!response.ok) {
		return {
			status: response.status,
			error: data.message,
			reason: data.reason,
			detail: data.detail
		};
	} else {
		return { brawlers: data.items };
	}
};
