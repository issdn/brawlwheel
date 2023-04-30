/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				nougat: ['Nougat', 'sans-serif']
			},
			colors: {
				'brawl-purple': '#7a03db',
				'brawl-violet': '#af14ec',
				'brawl-red': '#ec314e',
				'brawl-orange': '#f8ac22',
				'brawl-yellow': '#f3c622'
			},
			backgroundImage: {
				'secondary-gradient':
					'radial-gradient(circle at top right, transparent 0%, transparent 75%, #7a03db 75%, #7a03db 100%), linear-gradient(to bottom right, #7a03db 0%, #af14ec 100%)',
				'yellow-gradient': ''
			},
			dropShadow: {
				brawl: '#000000 0px 4px'
			},
			keyframes: {
				'background-move': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' }
				}
			},
			animation: {
				'background-move': 'background-move 10s linear infinite'
			}
		}
	},
	plugins: []
};
