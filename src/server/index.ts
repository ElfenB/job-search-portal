/* eslint-disable no-console */

import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { jobRouter } from './routers/jobRouter';
import { corsOptions } from './server.utils';
import { router } from "./trpc";

const appRouter = router({
  job: jobRouter
})

// Router type signature
export type AppRouter = typeof appRouter

const app = express();

app.use(cors(corsOptions));

app.use('/api/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(3000);

console.log('Server is running on http://localhost:3000')
