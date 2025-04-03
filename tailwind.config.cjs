module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                // Primary colors (Navy)
                primary: {
                    100: "#E8E8F0", // Very light navy
                    200: "#C5C7E0", // Light navy
                    300: "#9A9DCE", // Lighter navy
                    400: "#2A34A4", // Light navy
                    500: "#1A237E", // Deep Navy (primary brand color)
                    600: "#151B69", // Darker navy
                    700: "#10144F", // Even darker navy
                    800: "#0A0C35", // Very dark navy
                    900: "#05061A", // Nearly black navy
                },

                // Secondary colors (Jade Green)
                secondary: {
                    100: "#E6F0EC", // Very light green
                    200: "#C2DBD1", // Light green
                    300: "#9BC3B5", // Lighter green
                    400: "#37865F", // Light green
                    500: "#2E6E4E", // Jade Green (secondary brand color)
                    600: "#255A3F", // Darker green
                    700: "#1C4330", // Even darker green
                    800: "#132D20", // Very dark green
                    900: "#091610", // Nearly black green
                },

                // Accent colors (Earthy Red)
                accent: {
                    100: "#F5E9E7", // Very light red
                    200: "#E6C9C5", // Light red
                    300: "#D6A6A0", // Lighter red
                    400: "#C24B3A", // Light red
                    500: "#A63D2F", // Earthy Red (accent color)
                    600: "#8A3327", // Darker red
                    700: "#6F281F", // Even darker red
                    800: "#4D1C15", // Very dark red
                    900: "#2A0F0B", // Nearly black red
                },

                // Neutral colors
                neutral: {
                    100: "#F5F5F5", // Warm White
                    200: "#E5E5E5",
                    300: "#D4D4D4",
                    400: "#A3A3A3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#1A1A1A", // Rich Black
                },

                // Additional utility colors
                alert: "#FFC107", // Alert Amber
                success: "#4CAF50", // Success Green
            },
            fontFamily: {
                heading: ["Euclid Circular", "system-ui", "sans-serif"],
                body: ["IBM Plex Sans", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            fontSize: {
                // Custom font size scale
                xs: "0.75rem",
                sm: "0.875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
                "4xl": "2.25rem",
                "5xl": "3rem",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                float: "float 4s ease-in-out infinite",
                "bounce-slow": "bounce 2s infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
            },
            screens: {
                xs: "400px",
            },
            spacing: {
                72: "18rem",
                84: "21rem",
                96: "24rem",
                128: "32rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
