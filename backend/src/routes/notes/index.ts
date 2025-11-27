import { db } from "@/lib/db";
import { noteRepository } from "@/repositories/note";
import { noteContentRepository } from "@/repositories/note-content";
import type { NoteWithContentType } from "@/schemas/note";
import { OpenAPIHono } from "@hono/zod-openapi";
import { create, detail, list, patch, remove } from "./routes";

export const notesRoute = new OpenAPIHono();

notesRoute.openapi(list, async (c) => {
  const listNotes = await noteRepository.findAll();

  return c.json(listNotes);
});

notesRoute.openapi(detail, async (c) => {
  const { id } = c.req.valid("param");

  const findNote = await noteRepository.findById(id, true);
  if (!findNote) {
    return c.json({ message: `Note with ID ${id} not found` }, 404);
  }

  const note: NoteWithContentType = {
    title: findNote.title,
    id: findNote.id,
    createdAt: findNote.createdAt,
    updatedAt: findNote.updatedAt,
    content: findNote.content?.content,
  };

  return c.json(note, 200);
});

notesRoute.openapi(create, async (c) => {
  const newNote = c.req.valid("json");

  const createdNote = await db.transaction(async (tx) => {
    const noteRecord = await noteRepository.create(
      { title: newNote.title },
      tx,
    );

    await noteContentRepository.create(
      {
        content: newNote.content,
        noteId: noteRecord.id,
      },
      tx,
    );

    return noteRecord;
  });

  return c.json(createdNote, 201);
});

notesRoute.openapi(patch, async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  const findNote = await noteRepository.findById(id);
  if (!findNote) {
    return c.json({ code: 404, message: `Note with ID ${id} not found` }, 404);
  }

  if (data.title) {
    await noteRepository.update(id, { title: data.title });
  }

  if (data.content) {
    await noteContentRepository.update(id, data.content);
  }

  return c.json(findNote, 200);
});

notesRoute.openapi(remove, async (c) => {
  const { id } = c.req.valid("param");

  const findNote = await noteRepository.findById(id);
  if (!findNote) {
    return c.json({ message: `Note with ID ${id} not found` }, 404);
  }

  await noteRepository.delete(id);

  return c.body(null, 204);
});
