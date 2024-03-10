import { OfferCard } from "./OfferCard";
import { Offer } from "./OfferCard.types";

type Props = {
  offerList: Offer[];
};

export function OfferList({ offerList }: Props) {
  return offerList.map((offer) => <OfferCard key={offer.id} offer={offer} />);
}
