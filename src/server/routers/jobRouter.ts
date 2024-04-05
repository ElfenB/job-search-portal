/* eslint-disable sonarjs/prefer-immediate-return */

import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { dbMock } from "./jobRouter.mockData"
import { JobOfferInput } from "./jobRouter.types"

export const jobRouter = router({
  byId: publicProcedure.input(z.string()).query(async ({ input }) => {
    // TODO: Get job from database
    const job = await dbMock.jobs.findById(input)
    return job
  }),
  create: publicProcedure.input(JobOfferInput).mutation(async ({ input }) => {
    // TODO: Get jobs from database
    const job = dbMock.jobs.create(input)
    return job
  }),
  list: publicProcedure.query(async () => {
    // TODO: Get jobs from database
    const jobs = await dbMock.jobs.findMany()
    return jobs
  })
})
