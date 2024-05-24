import { z } from "zod";

export type JobOffer = {
  authorId: string;
  description?: string;
  id: string;
  image?: string;
  offerType: "offer" | "request";
  title: string;
}

export const JobOfferInput = z.object({
  authorId: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  offerType: z.union([z.literal("offer"), z.literal("request")]),
  title: z.string(),
})
