// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
