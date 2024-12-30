import { Rating } from "@prisma/client";
import { z } from "zod";

const commentValidator = z.object({
  body: z.string().min(70),
  rating: z.nativeEnum(Rating),
});

export default commentValidator;
