import { OpenAPIHono } from "@hono/zod-openapi";
import { notesRoute } from "./notes";

export const apiRoutes = new OpenAPIHono();

apiRoutes.route("/notes", notesRoute);
