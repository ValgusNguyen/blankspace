import { z } from "@hono/zod-openapi";

export const NoteSchema = z
  .object({
    id: z.uuidv7().openapi({ example: "019a6262-34c6-7de2-9e85-e20920ab5196" }),
    title: z.string().length(80).openapi({ example: "New note" }),
    createdAt: z.date().openapi({ example: "2025-11-08T07:37:22.298Z" }),
    updatedAt: z.date().openapi({ example: "2025-11-08T07:37:22.298Z" }),
  })
  .openapi("Note");

export const CreateNoteSchema = z.object({
  id: z
    .uuidv7()
    .optional()
    .openapi({ example: "019a6262-34c6-7de2-9e85-e20920ab5196" }),
  title: z.string().length(80).openapi({ example: "New note" }),
});
