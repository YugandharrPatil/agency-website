import { bigint, pgEnum, pgSequence, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const propertyStatus = pgEnum("property_status", ["available", "sold", "pending"]);
export const propertyType = pgEnum("property_type", ["house", "apartment", "condo", "townhouse", "land", "commercial"]);
export const senderRole = pgEnum("sender_role", ["user", "admin"]);
export const visitStatus = pgEnum("visit_status", ["pending", "confirmed", "cancelled"]);

export const petMessagesIdSeq = pgSequence("pet_messages_id_seq", { startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false });

export const agencyProjects = pgTable("agency_projects", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "bigint" }).primaryKey().generatedByDefaultAsIdentity(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
	repo: text(),
	demoVideo: text("demo_video"),
});

export const agencyMessages = pgTable("agency_messages", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "bigint" }).primaryKey().generatedByDefaultAsIdentity(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
	name: text(),
	email: text(),
	message: text(),
});
