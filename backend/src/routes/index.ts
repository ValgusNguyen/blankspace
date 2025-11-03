import { Hono } from "hono";
import { notesRoute } from "./notes";

export const apiRoutes = new Hono();

apiRoutes.route("/notes", notesRoute);
