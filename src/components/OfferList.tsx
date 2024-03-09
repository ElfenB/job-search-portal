import { OfferCard } from "./OfferCard";
import { offerListMockData } from "./OfferList.mockData";

export function OfferList() {
  return offerListMockData.map((offer) => <OfferCard offer={offer} />);
}
