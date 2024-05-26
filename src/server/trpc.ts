import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { AppContext } from ".";

// Initialize tRPC backend
const t = initTRPC.context<AppContext>().create({
  // Support for Dates, reference: https://trpc.io/docs/server/data-transformers#using-superjson
  transformer: superjson,
});

// Reusable router
export const router = t.router;

// Procedure helpers
export const publicProcedure = t.procedure;
