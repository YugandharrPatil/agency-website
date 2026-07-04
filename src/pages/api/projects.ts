import { db } from "@/db";
import { projects as agencyProjects } from "@/db/schema";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	try {
		const projects = await db.select().from(agencyProjects);
		// Map the camelCase Drizzle properties to the legacy snake_case expected by client components
		const mappedProjects = projects.map((p) => ({
			id: p.id,
			created_at: p.createdAt,
			repo: p.repo,
			demo_video: p.demoVideo,
		}));
		return new Response(JSON.stringify(mappedProjects), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err: any) {
		console.error("Error in GET /api/projects:", err);
		return new Response(JSON.stringify({ error: err.message || "Failed to fetch projects" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
