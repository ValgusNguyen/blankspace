import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { noteContents } from "./note_content";

export const notes = pgTable("notes", {
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text().notNull(),
  slug: text().unique().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  content: one(noteContents, {
    fields: [notes.id],
    references: [noteContents.noteId],
  }),
}));

export type NewNote = typeof notes.$inferInsert;
