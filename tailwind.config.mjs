/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: '#0e0e0e',       // deep charcoal
				foreground: '#e0f2f1',       // light jade mint
				primary: '#6ee7b7',          // jade green
				secondary: '#94a3b8',        // slate gray
				accent: '#f9a8d4',           // soft pink
				highlight: '#fef08a',        // pale gold
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--color-foreground)',
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
