import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonRouter,
} from "@ionic/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { fallbackUserImage } from "./ChatList.consts";
import type { Offer } from "./OfferCard.types";

type Props = {
  offer: Offer;
};

export function OfferCard({ offer }: Props) {
  const { t } = useTranslation();

  const currentTab = useIonRouter().routeInfo.tab;

  const { description, id: offerId, image, offerType, person, title } = offer;

  const shortenedDescription = useMemo(() => {
    if (!description) {
      return "";
    }

    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  }, [description]);

  return (
    <IonCard routerDirection="forward" routerLink={`/${currentTab}/${offerId}`}>
      {image && <img alt={title} src={image} style={{ height: "120px", objectFit: "cover", width: "100%" }} />}

      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{t(offerType)}</IonCardSubtitle>

        <IonAvatar style={{ position: "absolute", right: "1rem", top: "1rem" }}>
          <img alt={person.name} src={person.picture ?? fallbackUserImage} />
        </IonAvatar>
      </IonCardHeader>

      {shortenedDescription.length > 0 && <IonCardContent>{shortenedDescription}</IonCardContent>}
    </IonCard>
  );
}
