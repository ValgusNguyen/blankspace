import { z } from "@hono/zod-openapi";

const UuidSchema = z
  .uuidv7()
  .openapi({ example: "019a6262-34c6-7de2-9e85-e20920ab5196" });

const TimestampSchema = z
  .date()
  .openapi({ example: "2025-11-08T07:37:22.298Z" });

const NoteTitleSchema = z
  .string()
  .min(1)
  .max(256)
  .openapi({ example: "My Awesome Note" });

const NoteContentSchemaBase = z.string().nullable().openapi({
  example:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
});

export const NoteSchema = z
  .object({
    id: UuidSchema,
    title: NoteTitleSchema,
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
  })
  .openapi("Note");

export const NoteWithContentSchema = NoteSchema.extend({
  content: NoteContentSchemaBase,
}).openapi("NoteWithContent");

export const NoteCreateSchema = z
  .object({
    title: NoteTitleSchema,
    content: NoteContentSchemaBase,
  })
  .openapi("NoteCreate");

export const NoteUpdateSchema = z
  .object({
    title: NoteTitleSchema.optional(),
    content: NoteContentSchemaBase.optional(),
  })
  .openapi("NoteUpdate");

export type NoteCreateType = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateType = z.infer<typeof NoteUpdateSchema>;
export type NoteType = z.infer<typeof NoteSchema>;
export type NoteWithContentType = z.infer<typeof NoteWithContentSchema>;
