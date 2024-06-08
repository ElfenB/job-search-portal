import { z } from 'zod';
import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';
import { JobOfferInput } from './jobRouter.types';

export const jobRouter = router({
  byId: publicProcedure.input(z.number()).query(async ({ input }) => {
    // Increment views count by 1 when fetching offer
    await prisma.offer.update({ data: { views: { increment: 1 } }, where: { id: input } });
    return await prisma.offer.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(JobOfferInput)
    .mutation(async ({ input }) => await prisma.offer.create({ data: input })),
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => await prisma.offer.delete({ where: { id: input } })),
  list: publicProcedure
    .input(z.string())
    .query(async ({ input }) => await prisma.offer.findMany({ where: { NOT: { authorId: input } } })),
  listAll: publicProcedure.query(async () => await prisma.offer.findMany()),
  listMy: publicProcedure
    .input(z.string())
    .query(async ({ input }) => await prisma.offer.findMany({ where: { authorId: input } })),
  listUser: publicProcedure.input(z.string()).query(async ({ input }) => await prisma.offer.findMany({ where: { authorId: input } })),
});
