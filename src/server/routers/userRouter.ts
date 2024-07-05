import { z } from 'zod';
import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const user = await ctx.auth0.users.get({ id: input });
      return user.data;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        throw new Error(err.message);
      } else {
        console.error(err);
        throw new Error();
      }
    }
  }),
  rateUser: publicProcedure.input(z.object({ newRating: z.number(), userId: z.string() })).mutation(async ({ input }) => {
    const { newRating, userId } = input;

    if (newRating > 5) {
      return new Error('Rating must be between 0 and 5');
    }

    // Get user rating
    const userRating = await prisma.rating.findUnique({ where: { userId: userId } });

    if (!userRating || userRating.numRatings === 0 || userRating.ratingScore === null) {
      await prisma.rating.create({
        data: {
          numRatings: 1,
          ratingScore: newRating,
          userId: userId,
        },
      });
      return
    }

    const newRatingScore = (userRating.ratingScore * userRating.numRatings + newRating) / (userRating.numRatings + 1);

    await prisma.rating.update({
      data: { numRatings: { increment: 1 }, ratingScore: newRatingScore },
      where: { userId: userId },
    })
  }),
  ratingById: publicProcedure.input(z.string()).query(async ({ input }) => await prisma.rating.findUnique({ where: { userId: input } })),
  resetKarma: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await prisma.rating.delete({ where: { userId: input } });
  })
});
