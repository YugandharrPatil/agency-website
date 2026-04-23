// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [
		react(),
		icon({
			include: {
				lucide: ["check", "code", "workflow", "zap", "clock", "chevron-left"],
				"fa6-brands": ["twitter", "instagram", "github"],
				"fa6-regular": ["envelope"],
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},

	output: "server",
	adapter: vercel({
		imageService: true,
	}),
	devToolbar: {
		enabled: false,
	},
	env: {
		schema: {
			PUBLIC_SUPABASE_URL: envField.string({ context: "client", access: "public" }),
			PUBLIC_SUPABASE_KEY: envField.string({ context: "client", access: "public" }),
			GITHUB_AUTH_TOKEN: envField.string({ context: "server", access: "secret" }),
		},
	},
});
