import { User } from "@prisma/client";
import { z, ZodSchema } from "zod";

const userValidator = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
  profile: z.string().optional(),
});

export default userValidator;
