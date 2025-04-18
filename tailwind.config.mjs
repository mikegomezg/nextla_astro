/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				accent: 'var(--color-accent)',
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				highlight: 'var(--color-highlight)',
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
