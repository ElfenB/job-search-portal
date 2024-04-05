import { z } from "zod";

export type JobOffer = {
  description?: string;
  id: string;
  image?: string;
  offerType: "offer" | "request";
  title: string;
  userId: string;
}

export const JobOfferInput = z.object({
  description: z.string().optional(),
  image: z.string().optional(),
  offerType: z.union([z.literal("offer"), z.literal("request")]),
  title: z.string(),
  userId: z.string(),
})
