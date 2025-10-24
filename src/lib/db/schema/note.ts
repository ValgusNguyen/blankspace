import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: text().$defaultFn(() => createId()),
  title: text().notNull(),
  slug: text().unique().notNull(),
  excerpt: text().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
