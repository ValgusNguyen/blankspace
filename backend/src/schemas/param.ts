import { z } from "zod";

export const IdParamsSchema = z.object({
  id: z.uuidv7().openapi({ param: { name: "id", in: "path" } }),
});
