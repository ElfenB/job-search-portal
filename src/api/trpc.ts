import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import superjson from 'superjson';
import type { AppRouter } from "../server";
import { isNative } from "../utils/isNative";

function getBaseUrl(): string {
  if (isNative) {
    return `${import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000'}/api/trpc`
  }

  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3000/api/trpc';
  }
  return "/api/trpc";
}

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: getBaseUrl(),

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
