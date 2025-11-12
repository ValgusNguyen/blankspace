import {
  NoteSchema,
  NoteCreateSchema,
  NoteUpdateSchema,
  NoteWithContentSchema,
} from "@/schemas/note";
import { IdParamsSchema } from "@/schemas/param";
import { createRoute, z } from "@hono/zod-openapi";

export const list = createRoute({
  method: "get",
  path: "/",
  tags: ["Notes"],
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
  path: "/:id",
  tags: ["Notes"],
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
  },
});

export const create = createRoute({
  method: "post",
  path: "/",
  tags: ["Notes"],
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
  path: "/:id",
  tags: ["Notes"],
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
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Notes"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    204: {
      description: "Note delete sucessfully",
    },
  },
});
