import { z } from "zod";

const postValidator = z.object({
  tags: z.array(z.string().min(3)),
  title: z.string().min(3),
  body: z.string().min(70),
  images: z.array(z.string()).default([]),
});

export default postValidator;
