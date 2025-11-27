import { noteService } from "@/services/note";
import { OpenAPIHono } from "@hono/zod-openapi";
import { create, detail, list, patch, remove } from "./routes";

export const notesRoute = new OpenAPIHono();

notesRoute.openapi(list, async (c) => {
  const listNotes = await noteService.findAll();

  return c.json(listNotes);
});

notesRoute.openapi(detail, async (c) => {
  const { id } = c.req.valid("param");

  const note = await noteService.findNoteWithContent(id);
  if (!note) {
    return c.json({ code: 404, message: `Note with ID ${id} not found` }, 404);
  }

  return c.json(note, 200);
});

notesRoute.openapi(create, async (c) => {
  const newNote = c.req.valid("json");

  const createdNote = await noteService.create({
    title: newNote.title,
    content: newNote.content,
  });

  return c.json(createdNote, 201);
});

notesRoute.openapi(patch, async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  const updatedNote = await noteService.update(id, {
    title: data.title,
    content: data.content,
  });

  if (!updatedNote) {
    return c.json({ code: 404, message: `Note with ID ${id} not found` }, 404);
  }

  return c.json(updatedNote, 200);
});

notesRoute.openapi(remove, async (c) => {
  const { id } = c.req.valid("param");

  const deleted = await noteService.delete(id);
  if (!deleted) {
    return c.json({ code: 404, message: `Note with ID ${id} not found` }, 404);
  }

  return c.body(null, 204);
});
