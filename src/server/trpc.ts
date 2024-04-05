import { initTRPC } from "@trpc/server";

// Initialize tRPC backend
const t = initTRPC.create()

// Reusable router
export const router = t.router

// Procedure helpers
export const publicProcedure = t.procedure
