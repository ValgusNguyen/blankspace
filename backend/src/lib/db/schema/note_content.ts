import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { notes } from "./note";

export const noteContents = pgTable("note_contents", {
  noteId: uuid("note_id")
    .primaryKey()
    .references(() => notes.id, { onDelete: "cascade" }),
  content: text(),
});
