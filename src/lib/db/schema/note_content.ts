import { pgTable, text } from "drizzle-orm/pg-core";
import { notes } from "./note";

export const noteContents = pgTable("note_contents", {
  noteId: text("note_id")
    .primaryKey()
    .references(() => notes.id, { onDelete: "cascade" }),
  content: text(),
});
