import { CreateNoteSchema, NoteSchema } from "@/schemas/note";
import { createRoute } from "@hono/zod-openapi";

export const create = createRoute({
  method: "post",
  path: "/notes",
  request: {
    body: {
      description: "The note data to create a new note",
      content: {
        "application/json": { schema: CreateNoteSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Get all notes (no limit offset yet)",
      content: {
        "application/json": {
          schema: NoteSchema,
        },
      },
    },
  },
});
