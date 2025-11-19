import { db } from "@/lib/db";
import type {
  InsertNote,
  SelectNote,
  SelectNoteContent,
} from "@/lib/db/schema";
import { notes } from "@/lib/db/schema/note";
import type { NoteUpdateType } from "@/schemas/note";
import { eq } from "drizzle-orm";

export class NoteRepository {
  async findAll() {
    return await db.query.notes.findMany();
  }

  async findById(
    id: string,
    includeContent: true,
  ): Promise<(SelectNote & { content: SelectNoteContent }) | undefined>;

  async findById(id: string): Promise<SelectNote | undefined>;

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

  async create(newNote: InsertNote) {
    const returnData = await db.insert(notes).values(newNote).returning();
    return returnData[0];
  }

  async update(id: string, updateData: Pick<InsertNote, "title">) {
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
