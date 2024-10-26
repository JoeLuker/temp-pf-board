/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		{
			pattern: /bg-(red|green|orange|blue|purple|pink|yellow)-(100|200)/
		}
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Cinzel', 'serif'],
				pirata: ['"Pirata One"', 'cursive'],
				bilbo: ['"Bilbo Swash Caps"', 'cursive'],
				morris: ['Morris', 'serif']
			}
		}
	},
	plugins: []
};
