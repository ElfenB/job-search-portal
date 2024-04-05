import { trpc } from "../api/trpc";
import { OfferCard } from "./OfferCard";
import { OfferListSkeleton } from "./OfferListSkeleton";

export function OfferList() {
  const { data, error, isPending } = trpc.job.list.useQuery();

  if (isPending) {
    return <OfferListSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return data.map((offer) => <OfferCard key={offer.id} offer={offer} />);
}
