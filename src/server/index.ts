/* eslint-disable no-console */

import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getAuth0Client } from "./auth0";
import { jobRouter } from "./routers/jobRouter";
import { userRouter } from "./routers/userRouter";
import { corsOptions } from "./server.utils";
import { router } from "./trpc";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const appRouter = router({
  job: jobRouter,
  user: userRouter,
});
// Router type signature
export type AppRouter = typeof appRouter;

const createContext = ({ req: _req, res: _res }: trpcExpress.CreateExpressContextOptions) => ({
  auth0: getAuth0Client(),
});
export type AppContext = Awaited<ReturnType<typeof createContext>>;

const app = express();

app.use(cors(corsOptions));
app.use("/api/trpc", trpcExpress.createExpressMiddleware({ createContext, router: appRouter }));

app.listen(3000);

console.log("Server is running on http://localhost:3000");
