import { noteRepository } from "@/repositories/note";
import { noteContentRepository } from "@/repositories/note-content";
import type { NoteWithContentType } from "@/schemas/note";
import { db } from "@/lib/db";

export class NoteService {
  async findAll() {
    return await noteRepository.findAll();
  }

  async findById(id: string) {
    return await noteRepository.findById(id);
  }

  async findNoteWithContent(id: string): Promise<NoteWithContentType | null> {
    const findNote = await noteRepository.findById(id, true);
    if (!findNote) {
      return null;
    }

    return {
      title: findNote.title,
      id: findNote.id,
      createdAt: findNote.createdAt,
      updatedAt: findNote.updatedAt,
      content: findNote.content?.content,
    };
  }

  async create(data: { title: string; content: string | null }) {
    return await db.transaction(async (tx) => {
      const noteRecord = await noteRepository.create({ title: data.title }, tx);

      if (data.content !== null) {
        await noteContentRepository.create(
          {
            content: data.content,
            noteId: noteRecord.id,
          },
          tx,
        );
      }

      return noteRecord;
    });
  }

  async update(id: string, data: { title?: string; content?: string | null }) {
    const findNote = await noteRepository.findById(id);
    if (!findNote) {
      return null;
    }

    if (data.title) {
      await noteRepository.update(id, { title: data.title });
    }

    if (data.content !== undefined) {
      await noteContentRepository.update(id, data.content);
    }

    return await noteRepository.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const findNote = await noteRepository.findById(id);
    if (!findNote) {
      return false;
    }

    await noteRepository.delete(id);
    return true;
  }
}

export const noteService = new NoteService();
