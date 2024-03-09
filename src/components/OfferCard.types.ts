export interface Offer {
  description?: string;
  id: string;
  image?: string;
  offerType: "offer" | "request";
  title: string;
}
