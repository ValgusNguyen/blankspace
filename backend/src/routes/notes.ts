import { db } from "@/lib/db";
import { notes, type NewNote } from "@/lib/db/schema/note";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const notesRoute = new Hono();

notesRoute.get("/", async (c) => {
  const listNotes = await db.select().from(notes).orderBy(notes.id);

  return c.json(listNotes);
});

notesRoute.post("/", async (c) => {
  const newNote: NewNote = await c.req.json();
  const createdNote = await db.insert(notes).values(newNote).returning();

  return c.json(createdNote, 201);
});

notesRoute.patch("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();

  const findNote = await db
    .select()
    .from(notes)
    .where(eq(notes.id, id))
    .limit(1);

  if (!findNote.length) {
    throw new HTTPException(404, {
      message: `Note with ID ${id} not found `,
    });
  }

  const updatedNote = await db
    .update(notes)
    .set(data)
    .where(eq(notes.id, id))
    .returning();

  return c.json(updatedNote, 200);
});

notesRoute.delete("/:id", async (c) => {
  const { id } = c.req.param();

  const findNote = await db
    .select()
    .from(notes)
    .where(eq(notes.id, id))
    .limit(1);

  if (!findNote.length) {
    throw new HTTPException(404, {
      message: `Note with ID ${id} not found `,
    });
  }

  await db.delete(notes).where(eq(notes.id, id));

  return c.body(null, 204);
});
