import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	createdAt: text("created_at")
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	repo: text("repo"),
	demoVideo: text("demo_video"),
});

export const messages = sqliteTable("messages", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	createdAt: text("created_at")
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	name: text("name"),
	email: text("email"),
	message: text("message"),
});
