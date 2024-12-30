import { z } from "zod";

console.log(import.meta.env);
export const env = z
  .object({
    VITE_CLIENT: z.string(),
    DEV: z.boolean(),
  })
  .parse(import.meta.env);
