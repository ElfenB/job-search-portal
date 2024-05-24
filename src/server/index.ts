/* eslint-disable no-console */

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { jobRouter } from './routers/jobRouter';
import { router } from "./trpc";


const appRouter = router({
  job: jobRouter
})

// Router type signature
export type AppRouter = typeof appRouter

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter
})

server.listen(3000)

console.log('Server is running on http://localhost:3000')

// TODO: Add database connection
// TODO: For backend, use prisma.io with postgresql
// TODO: Add deployment for backend
// TODO: Run everything using helm charts

// TODO: Add authentication?
