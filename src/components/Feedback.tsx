import { IonButton, IonIcon, IonText } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

export function Feedback() {
  const { t } = useTranslation();

  return (
    <div>
      <IonButton
        fill="solid"
        onClick={() =>
          window.open(
            // Generated using https://mailtolink.me
            'mailto:dev@benelfen.com?subject=Jobber%20App%20Feedback&body=Hi%20Devs%2C%0D%0A%0D%0A%0D%0A%0D%0AKind%20regards%2C%0D%0A%7Byour-name-here%7D%0D%0A',
          )
        }
      >
        <IonIcon icon={mailOutline} />

        <IonText style={{ marginLeft: '0.25rem' }}>{t('label.feedback')}</IonText>
      </IonButton>
    </div>
  );
}
