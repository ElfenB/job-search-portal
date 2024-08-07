import { useMemo } from 'react';
import type { User } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { fallbackUserImage } from './ChatList.consts';
import { Rating } from './Rating';

export function UserProfile() {
  const { t } = useTranslation();
  const { isLoading, user } = useAuth0();

  const userImage = useMemo(
    () => (!user?.picture || user.picture.length === 0 ? fallbackUserImage : user.picture),
    [user?.picture],
  );

  // If the SDK is not ready, or a user is not authenticated, exit.
  if (isLoading || !user) return null;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{user.name}</IonCardTitle>

        <IonCardSubtitle>{user.email}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonAvatar style={{ height: '8rem', margin: '0 auto', width: '8rem' }}>
          <img alt={user.name ?? t('label.yourpicture')} src={userImage} />
        </IonAvatar>

        <IonList lines="full">
          <IonListHeader>{t('label.profiledetails')}</IonListHeader>

          <IonItem>
            <Rating disableInteraction userId={user.sub ?? ''} />
          </IonItem>

          {Object.keys(user).map((d: keyof User) => {
            // Don't show the picture, name, or email in the list.
            if (d === 'picture' || d === 'name' || d === 'email') {
              return null;
            }

            return (
              <IonItem key={d}>
                <IonLabel>
                  {/* Stringify to also show boolean values */}
                  {d}: {JSON.stringify(user[d]).replace(/"/g, '')}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
