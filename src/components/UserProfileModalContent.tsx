import { IonAvatar, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonLoading } from '@ionic/react';
import { checkmarkCircleSharp } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';
import { Divider } from './Divider';
import { OfferList } from './OfferList';

type Props = {
  id: string;
};

export function UserProfileModalContent({ id }: Props) {
  const { t } = useTranslation();

  const { data: person, error, isPending } = trpc.user.byId.useQuery(id);

  const offers = trpc.job.listUser.useQuery(person?.user_id ?? '');

  if (isPending) {
    return (
      <IonContent>
        <IonLoading isOpen />
      </IonContent>
    );
  }

  if (!person || error !== null) {
    return (
      <IonContent>
        <p>Error: {error.message}</p>
      </IonContent>
    );
  }

  return (
    <IonContent className="ion-padding">
      <IonAvatar style={{ height: '8rem', margin: '0 auto', width: '8rem' }}>
        <img alt={person.name} src={person.picture} />
      </IonAvatar>

      <IonList lines="full">
        <IonListHeader>{person.name}</IonListHeader>

        <IonItem>
          <IonLabel style={{ alignItems: 'center', display: 'flex' }}>
            <span>
              <b>{t('label.email')}:</b> {person.email}
            </span>
            {person.email_verified && (
              <IonIcon icon={checkmarkCircleSharp} style={{ color: 'green', marginLeft: '0.2rem' }} />
            )}
          </IonLabel>
        </IonItem>

        {person.created_at && (
          <IonItem>
            <IonLabel>
              <b>{t('label.membersince')}:</b> {new Date(person.created_at as Date).toLocaleDateString()}
            </IonLabel>
          </IonItem>
        )}

        {person.last_login && (
          <IonItem>
            <IonLabel>
              <b>{t('label.lastlogin')}:</b> {new Date(person.last_login as Date).toLocaleDateString()}
            </IonLabel>
          </IonItem>
        )}
      </IonList>

      <Divider />

      <IonList>
        <IonListHeader>{t('label.offers')}</IonListHeader>
      </IonList>

      <OfferList data={offers} disableItemClick />
    </IonContent>
  );
}
