import { useMemo } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import type { Offer } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from './UserAvatar';

type Props = {
  offer: Offer;
};

export function OfferCard({ offer }: Props) {
  const { t } = useTranslation();

  const { authorId, description, id: offerId, image, offerType, title } = offer;

  const currentLocation = useMemo(() => window.location.pathname, []);

  const shortenedDescription = useMemo(() => {
    if (!description) {
      return '';
    }

    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  }, [description]);

  return (
    <IonCard routerDirection="forward" routerLink={`${currentLocation}/${offerId}`}>
      {image && <img alt={title} src={image} style={{ height: '120px', objectFit: 'cover', width: '100%' }} />}

      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{t(offerType)}</IonCardSubtitle>

        <UserAvatar style={{ position: 'absolute', right: '1rem', top: '1rem' }} userId={authorId} />
      </IonCardHeader>

      {shortenedDescription.length > 0 && <IonCardContent>{shortenedDescription}</IonCardContent>}
    </IonCard>
  );
}
