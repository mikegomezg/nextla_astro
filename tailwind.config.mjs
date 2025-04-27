/** @type {import('tailwindcss').Config} */
import { withOpacity } from './tailwind.utils.js';

export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./src/styles/utilities.css'
	],
	theme: {
		screens: {
			sm: '640px',   // Small screens (phones)
			md: '768px',   // Medium screens (tablets)
			lg: '1024px',  // Large screens (small laptops)
			xl: '1280px',  // Extra large (desktops)
			'2xl': '1536px', // Very large screens
		},
		extend: {
			colors: {
				background: withOpacity('--color-background'),           // Deep Space Black
				// backgroundAlt: 'var(--color-background-alt)', // This token wasn't in the provided theme.css
				surface: withOpacity('--color-surface'),              // Gunmetal
				text: withOpacity('--color-text'),              // Renamed from textDefault (conceptually)
				muted: withOpacity('--color-muted'),             // Renamed from textMuted
				primary: withOpacity('--color-primary'),              // Deep Jade
				primaryDark: 'var(--color-primaryDark)',          // Darker Jade
				secondary: withOpacity('--color-secondary'),            // Electric Blue
				highlight: withOpacity('--color-highlight'),            // Electric Blue (was Vibrant Gold)
				accent: withOpacity('--color-accent'),               // Antique Gold
				accentDark: 'var(--color-accentDark)',           // Blood Red
				featherbg: 'var(--color-featherbg)',            // Feather Background
				outline: withOpacity('--color-outline'),
			},
			fontFamily: { sans: 'var(--font-sans)' },
			backgroundImage: {
				'feather-gradient': 'var(--gradient-feather)',
				'cosmic-gradient': 'var(--gradient-cosmic)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--color-text)',
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
