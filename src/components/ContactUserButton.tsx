import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IonButton, IonIcon, IonText } from '@ionic/react';
import { mail } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';

type Props = {
  subject?: string;
  userId: string;
};

export function ContactUserButton({ subject, userId }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth0();

  const { data: person, error, isPending } = trpc.user.byId.useQuery(userId);

  const handleContact = useCallback(
    () =>
      window.open(
        // Generated using: https://mailtolink.me
        `mailto:${person?.email}?subject=${subject}&body=Hello%20${person?.name}%2C%0D%0A%0D%0AI%20am%20interested%20in%20%22${subject}%22.%0D%0A%0D%0AKind%20regards%2C%0D%0A${user?.name}%0D%0A`,
      ),
    [person?.email, person?.name, subject, user?.name],
  );

  if (error) {
    return (
      <IonText>
        {t('label.error')}: {error.message}
      </IonText>
    );
  }

  if (!person?.email) {
    return (
      <div className="ion-padding">
        <IonText color="danger">
          {t('label.contact')} {t('label.notPossible')}
        </IonText>
      </div>
    );
  }

  return (
    <div className="ion-padding">
      <IonButton disabled={isPending} expand="block" onClick={handleContact}>
        <IonIcon icon={mail} slot="start" /> {t('label.contact')}
      </IonButton>
    </div>
  );
}
