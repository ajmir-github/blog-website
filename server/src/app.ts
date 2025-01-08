import { publicRouter, router } from "@/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const appRouter = router({
  getLength: publicRouter
    .input(z.object({ message: z.string() }))
    .query(({ input }) => {
      return {
        message: input.message,
        length: input.message.length,
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(4000);

export type AppRouter = typeof appRouter;
