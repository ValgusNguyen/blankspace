import {
  ErrorSchema,
  NoteCreateSchema,
  NoteSchema,
  NoteUpdateSchema,
  NoteWithContentSchema,
} from "@/schemas/note";
import { IdParamsSchema } from "@/schemas/param";
import { createRoute, z } from "@hono/zod-openapi";

export const list = createRoute({
  method: "get",
  path: "/",
  tags: ["Notes"],
  summary: "Get all notes metada",
  responses: {
    200: {
      description: "Get all notes (no limit offset yet)",
      content: {
        "application/json": {
          schema: z.array(NoteSchema),
        },
      },
    },
  },
});

export const detail = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["Notes"],
  summary: "Get the note detail with content",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "Get note full details",
      content: {
        "application/json": {
          schema: NoteWithContentSchema,
        },
      },
    },
    404: {
      description: "Note not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

export const create = createRoute({
  method: "post",
  path: "/",
  tags: ["Notes"],
  summary: "Create a new note",
  request: {
    body: {
      description: "The note data to create a new note",
      content: {
        "application/json": { schema: NoteCreateSchema },
      },
    },
  },
  responses: {
    201: {
      description: "The new note just created",
      content: {
        "application/json": {
          schema: NoteSchema,
        },
      },
    },
  },
});

export const patch = createRoute({
  method: "patch",
  path: "/{id}",
  tags: ["Notes"],
  summary: "Update an existing note",
  request: {
    params: IdParamsSchema,
    body: {
      description: "The updated note data",
      content: {
        "application/json": { schema: NoteUpdateSchema },
      },
    },
  },
  responses: {
    200: {
      description: "Get updated note",
      content: {
        "application/json": {
          schema: NoteSchema,
        },
      },
    },
    404: {
      description: "Note not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Notes"],
  summary: "Delete a note",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    204: {
      description: "Note delete sucessfully",
    },
    404: {
      description: "Note not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});
