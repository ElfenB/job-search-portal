import type { User } from "@auth0/auth0-react";

export type Offer = {
  description?: string;
  id: string;
  image?: string;
  offerType: "offer" | "request";
  person: User
  title: string;
};
