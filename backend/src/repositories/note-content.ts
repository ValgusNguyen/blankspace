import { db, type DBOrTx } from "@/lib/db";
import { noteContents, type InsertNoteContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

class NoteContentRepository {
  async create(data: InsertNoteContent, dbOrTx: DBOrTx = db) {
    const returnData = await dbOrTx
      .insert(noteContents)
      .values(data)
      .returning();

    return returnData[0];
  }

  async update(noteId: string, content: string | null) {
    await db
      .update(noteContents)
      .set({ content })
      .where(eq(noteContents.noteId, noteId));
  }
}

export const noteContentRepository = new NoteContentRepository();
