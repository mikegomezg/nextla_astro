import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    integrations: [tailwind()],
    markdown: {
        shikiConfig: {
            theme: "github-dark",
            wrap: true,
        },
    },
    site: "https://nextla.net",
    outDir: "./dist",
});
