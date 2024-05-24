import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../server";
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // url: "/api/trpc",
      url: 'http://localhost:3000',

      // Possible to pass headers here
      // async headers() {
      //   return {};
      // },

      // Support for Dates, reference: https://trpc.io/docs/server/data-transformers#using-superjson
      transformer: superjson
    }),
  ],
});

// TanStack Query
export const queryClient = new QueryClient();
