// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],

	vite: {
		plugins: [tailwindcss()],
	},

	output: "server",
	adapter: vercel(),
	devToolbar: {
		enabled: false,
	},
	env: {
		schema: {
			PUBLIC_SUPABASE_URL: envField.string({ context: "server", access: "public" }),
			PUBLIC_SUPABASE_KEY: envField.string({ context: "server", access: "public" }),
			GITHUB_AUTH_TOKEN: envField.string({ context: "server", access: "secret" }),
		},
	},
});
