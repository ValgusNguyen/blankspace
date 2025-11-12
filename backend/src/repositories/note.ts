import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema/note";
import type {
  NoteCreateType,
  NoteType,
  NoteUpdateType,
  NoteWithContentType,
} from "@/schemas/note";
import { eq } from "drizzle-orm";

export class NoteRepository {
  async findAll() {
    return await db.query.notes.findMany();
  }

  async findById(
    id: string,
    includeContent: true,
  ): Promise<NoteWithContentType | undefined>;

  async findById(id: string): Promise<NoteType | undefined>;

  async findById(id: string, includeContent = false) {
    if (includeContent) {
      return await db.query.notes.findFirst({
        where: eq(notes.id, id),
        with: { content: true },
      });
    }

    return await db.query.notes.findFirst({
      where: eq(notes.id, id),
    });
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
