import { BRAWL_API_KEY } from '$env/static/private';

export const config = {
	runtime: 'edge'
};

export const GET = async () => {
	const response = await fetch(`https://api.brawlstars.com/v1/events/rotation`, {
		headers: {
			Authorization: `Bearer ${BRAWL_API_KEY}`
		}
	});
	const data = await response.json();
	if (!response.ok) {
		return new Response(
			JSON.stringify({
				status: response.status,
				error: data.message,
				reason: data.reason,
				detail: data.detail
			})
		);
	} else {
		return new Response(JSON.stringify({ events: data }));
	}
};
