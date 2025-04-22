/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',           // Deep Space Black
				backgroundAlt: 'var(--color-background-alt)',        // Rich Dark
				surface: 'var(--color-surface)',              // Gunmetal
				textDefault: 'var(--color-text-default)',          // Off-White
				textMuted: 'var(--color-text-muted)',            // Neutral Gray
				primary: 'var(--color-primary)',              // Deep Jade
				primaryDark: 'var(--color-primary-dark)',          // Darker Jade
				secondary: 'var(--color-secondary)',            // Electric Blue
				highlight: 'var(--color-highlight)',            // Electric Blue (was Vibrant Gold)
				accent: 'var(--color-accent)',               // Antique Gold
				accentDark: 'var(--color-accent-dark)',           // Blood Red
				featherbg: 'var(--color-featherbg)',            // Feather Background
			},
			backgroundImage: {
				'feather-gradient': 'var(--gradient-feather)',
				'cosmic-gradient': 'var(--gradient-cosmic)',
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
