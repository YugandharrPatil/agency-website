import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from "astro:env/server";
import * as schema from "./schema";

const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN || undefined,
});

export const db = drizzle(client, { schema });
