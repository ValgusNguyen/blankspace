import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema/note";
import type { NoteCreateType, NoteUpdateType } from "@/schemas/note";
import { eq } from "drizzle-orm";

export class NoteRepository {
  async findAll() {
    return await db.select().from(notes).orderBy(notes.id);
  }

  async findById(id: string) {
    return await db.select().from(notes).where(eq(notes.id, id)).limit(1);
  }

  async create(newNote: NoteCreateType) {
    const returnData = await db.insert(notes).values(newNote).returning();
    return returnData[0];
  }

  async update(id: string, updateData: NoteUpdateType) {
    const updatedData = await db
      .update(notes)
      .set(updateData)
      .where(eq(notes.id, id))
      .returning();

    return updatedData[0];
  }

  async delete(id: string) {
    return await db.delete(notes).where(eq(notes.id, id));
  }
}

export const noteRepository = new NoteRepository();
