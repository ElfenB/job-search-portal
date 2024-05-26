import { z } from "zod";

export const JobOfferInput = z.object({
  authorId: z.string(),
  currency: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  location: z.string().optional(),
  money: z.number().optional(),
  offerType: z.union([z.literal("offer"), z.literal("request")]),
  paymentType: z.string().optional(),
  title: z.string(),
})
