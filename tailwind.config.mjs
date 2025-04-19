/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: '#0A0E17',           // Deep Space Black
				backgroundAlt: '#101114',        // Rich Dark
				surface: '#2A3035',              // Gunmetal
				textDefault: '#F2F2F2',          // Off-White
				textMuted: '#AAAAAA',            // Neutral Gray
				primary: '#00694A',              // Deep Jade
				primaryDark: '#004D36',          // Darker Jade
				secondary: '#1E90FF',            // Electric Blue
				highlight: '#1E90FF',            // Electric Blue (was Vibrant Gold)
				accent: '#CFB53B',               // Antique Gold
				accentDark: '#8B0000',           // Blood Red
				featherbg: '#010b17',            // Feather Background
			},
			backgroundImage: {
				'feather-gradient': 'linear-gradient(135deg, #CFB53B, #00694A)',
				'cosmic-gradient': 'radial-gradient(circle at 50% 50%, #FFD700 0%, #0A0E17 100%)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--color-text-default)',
						a: {
							color: 'var(--color-accent)',
						},
						h1: {
							color: 'var(--color-primary)',
						},
						h2: {
							color: 'var(--color-primary)',
						},
						h3: {
							color: 'var(--color-primary)',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
