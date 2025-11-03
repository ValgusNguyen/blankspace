import { db } from "@/lib/db";
import { notes, type NewNote } from "@/lib/db/schema/note";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const notesRoute = new Hono();

notesRoute.get("/", async (c) => {
  const listNotes = await db.select().from(notes);

  return c.json(listNotes);
});

notesRoute.post("/", async (c) => {
  const { slug, title }: NewNote = await c.req.json();

  const findNote = await db
    .select()
    .from(notes)
    .where(eq(notes.slug, slug))
    .limit(1);

  if (findNote.length > 0) {
    throw new HTTPException(400, {
      message: "Slug already exist",
    });
  }

  const newNote = await db.insert(notes).values({ slug, title }).returning();

  return c.json(newNote, 201);
});

notesRoute.patch("/:id", (c) => c.json("update a note info"));

notesRoute.delete("/:id", (c) => c.json("delete a note"));
