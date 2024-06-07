import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const users = await ctx.auth0.users.get({ id: input });
      return users.data;
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
});
