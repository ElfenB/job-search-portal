import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { useOfferListData } from "../useHooks/useOfferListData";
import { ContentPlaceholderMessage } from "./ContentPlaceholderMessage";
import { CreateOfferCard } from "./CreateOfferCard";
import { OfferCard } from "./OfferCard";
import { OfferListSkeleton } from "./OfferListSkeleton";

type Props = {
  personal?: boolean;
};

export function OfferList({ personal }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth0();

  const { data, error, isPending } = useOfferListData(user?.sub ?? "", personal);

  if (isPending) {
    return <OfferListSkeleton />;
  }

  if (error) {
    return <ContentPlaceholderMessage color="red" message={`${t("label.error")}: ${error.message}`} />;
  }

  if (data.length === 0) {
    return <ContentPlaceholderMessage message={t("label.noOffersFound")} />;
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
