import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { noteContents } from "./note-content";

export const notes = pgTable("notes", {
  id: uuid()
    .default(sql`uuidv7()`)
    .primaryKey(),
  title: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  content: one(noteContents, {
    fields: [notes.id],
    references: [noteContents.noteId],
  }),
}));

export type SelectNote = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;
