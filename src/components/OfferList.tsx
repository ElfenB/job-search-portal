import { useAuth0 } from "@auth0/auth0-react";
import { useOfferListData } from "../useHooks/useOfferListData";
import { CreateOfferCard } from "./CreateOfferCard";
import { OfferCard } from "./OfferCard";
import { OfferListSkeleton } from "./OfferListSkeleton";

type Props = {
  personal?: boolean;
};

export function OfferList({ personal }: Props) {
  const { user } = useAuth0();

  const { data, error, isPending } = useOfferListData(user?.sub ?? "", personal);

  if (isPending) {
    return <OfferListSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return <div>No offers found</div>;
  }

  return (
    <>
      {personal && <CreateOfferCard />}

      {data.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </>
  );
}
