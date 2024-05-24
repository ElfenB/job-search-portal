import { z } from "zod"
import { prisma } from "../prisma"
import { publicProcedure, router } from "../trpc"
import { JobOfferInput } from "./jobRouter.types"

export const jobRouter = router({
  byId: publicProcedure.input(z.number()).query(async ({ input }) => prisma.offer.findUnique({ where: { id: input } })),
  create: publicProcedure.input(JobOfferInput).mutation(async ({ input }) => prisma.offer.create({ data: input })),
  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => prisma.offer.delete({ where: { id: input } })),
  list: publicProcedure.input(z.string()).query(async ({ input }) => prisma.offer.findMany({ where: { NOT: { authorId: input } } })),
  listAll: publicProcedure.query(async () => prisma.offer.findMany()),
  listMy: publicProcedure.input(z.string()).query(async ({ input }) => prisma.offer.findMany({ where: { authorId: input } })),
})
