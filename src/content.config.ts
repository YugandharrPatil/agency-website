import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
	// schema: z.object({
	// 	title: z.string(),
	// 	length: z.number(),
	// }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { articles };
