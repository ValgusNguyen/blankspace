import { notes } from "@/lib/db/schema/note";
import { z } from "@hono/zod-openapi";
import { createSchemaFactory } from "drizzle-zod";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({ zodInstance: z });

export const NoteSchema = createSelectSchema(notes, {
  id: (schema) =>
    schema.openapi({ example: "019a6262-34c6-7de2-9e85-e20920ab5196" }),
  title: (schema) => schema.openapi({ example: "New note" }),
  createdAt: (schema) =>
    schema.openapi({ example: "2025-11-08T07:37:22.298Z" }),
  updatedAt: (schema) =>
    schema.openapi({ example: "2025-11-08T07:37:22.298Z" }),
}).openapi("Note");

export const NoteCreateSchema = createInsertSchema(notes);
export const NoteUpdateSchema = createUpdateSchema(notes).pick({ title: true });

export type NoteCreateType = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateType = z.infer<typeof NoteUpdateSchema>;
