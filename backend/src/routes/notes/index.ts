import { noteRepository } from "@/repositories/note";
import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { create, list, patch, remove } from "./routes";

export const notesRoute = new OpenAPIHono();

notesRoute.openapi(list, async (c) => {
  const listNotes = await noteRepository.findAll();

  return c.json(listNotes);
});

notesRoute.openapi(create, async (c) => {
  const newNote = c.req.valid("json");
  const createdNote = await noteRepository.create(newNote);

  return c.json(createdNote, 201);
});

notesRoute.openapi(patch, async (c) => {
  const { id } = c.req.valid("param");
  const data = await c.req.json();

  const findNote = await noteRepository.findById(id);
  if (!findNote.length) {
    throw new HTTPException(404, {
      message: `Note with ID ${id} not found `,
    });
  }

  const updatedNote = await noteRepository.update(id, data);
  return c.json(updatedNote, 200);
});

notesRoute.openapi(remove, async (c) => {
  const { id } = c.req.valid("param");

  const findNote = await noteRepository.findById(id);
  if (!findNote.length) {
    throw new HTTPException(404, {
      message: `Note with ID ${id} not found `,
    });
  }

  await noteRepository.delete(id);

  return c.body(null, 204);
});
