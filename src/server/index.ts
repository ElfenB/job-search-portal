/* eslint-disable sonarjs/prefer-immediate-return */

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from "zod";
import { dbMock } from "./index.mockData";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  jobById: publicProcedure.input(z.string()).query(async ({ input }) => {
    // TODO: Get job from database
    const job = await dbMock.jobs.findById(input)
    return job
  }),
  jobCreate: publicProcedure.input(z.object({ name: z.string() })).mutation(async ({ input }) => {
    // TODO: Get jobs from database
    const job = dbMock.jobs.create(input)
    return job
  }),
  jobList: publicProcedure.query(async () => {
    // TODO: Get jobs from database
    const jobs = await dbMock.jobs.findMany()
    return jobs
  })
})

// Router type signature
export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter
})

server.listen(3000)
