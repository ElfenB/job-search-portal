import { useMemo } from "react";
import type { User } from "@auth0/auth0-react";
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import type { Offer } from "@prisma/client";
import { useTranslation } from "react-i18next";
import { fallbackUserImage } from "./ChatList.consts";

type Props = {
  offer: Offer;
};

export function OfferCard({ offer }: Props) {
  const { t } = useTranslation();

  const { authorId, description, id: offerId, image, offerType, title } = offer;

  const currentLocation = useMemo(() => window.location.pathname, []);

  // FIXME: This is a mock function that should be replaced with a real API call to Auth0
  // const person = getUserFromId(authorId);
  const person = { name: `John Doe (${authorId})`, picture: fallbackUserImage } as User;

  const shortenedDescription = useMemo(() => {
    if (!description) {
      return "";
    }

    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  }, [description]);

  return (
    <IonCard routerDirection="forward" routerLink={`${currentLocation}/${offerId}`}>
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
