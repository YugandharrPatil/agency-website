import { db } from "@/db";
import { messages } from "@/db/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		if (!name || !email || !message) {
			return new Response(JSON.stringify({ error: "Name, email, and message are required." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		await db.insert(messages).values({
			name,
			email,
			message,
		});

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err: any) {
		console.error("Error in POST /api/contact:", err);
		return new Response(JSON.stringify({ error: err.message || "Failed to submit contact message" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
