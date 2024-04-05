import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../server";

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",

      // Possible to pass headers here
      // async headers() {
      //   return {};
      // },
    }),
  ],
});

// TanStack Query
export const queryClient = new QueryClient();
