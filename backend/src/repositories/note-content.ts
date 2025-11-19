import { db, type DBOrTx } from "@/lib/db";
import { noteContents, type InsertNoteContent } from "@/lib/db/schema";

class NoteContentRepository {
  async create(data: InsertNoteContent, dbOrTx: DBOrTx = db) {
    const returnData = await dbOrTx
      .insert(noteContents)
      .values(data)
      .returning();

    return returnData[0];
  }
}

export const noteContentRepository = new NoteContentRepository();
