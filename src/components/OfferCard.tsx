import { useAuth0 } from "@auth0/auth0-react";
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { useMemo } from "react";
import type { Offer } from "./OfferCard.types";

interface Props {
  offer: Offer;
}

export function OfferCard({ offer }: Props) {
  const { user } = useAuth0();

  const { description, id: offerId, image, offerType, title } = offer;

  const shortenedDescription = useMemo(() => {
    if (!description) {
      return "";
    }

    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  }, [description]);

  return (
    <IonCard routerDirection="forward" routerLink={`/overview/${offerId}`}>
      {image && <img alt={title} src={image} style={{ height: "120px", objectFit: "cover", width: "100%" }} />}

      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{offerType}</IonCardSubtitle>

        {user && (
          <IonAvatar style={{ position: "absolute", right: "1rem", top: "1rem" }}>
            <img alt={user.name} src={user.picture} />
          </IonAvatar>
        )}
      </IonCardHeader>

      {shortenedDescription.length > 0 && <IonCardContent>{shortenedDescription}</IonCardContent>}
    </IonCard>
  );
}
