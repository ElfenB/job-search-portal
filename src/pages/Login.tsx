import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';
import hand from '../lotties/hand.json';
import { isNative } from '../utils/isNative';

export function Login() {
  const { t } = useTranslation();
  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: '_self',
        });
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('label.login')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            paddingBottom: '10vh',
          }}
        >
          <Lottie animationData={hand} autoplay loop style={{ width: '10rem' }} />

          <h3>{t('welcomemessage')}</h3>

          <div style={{ height: '3rem' }} />

          <IonButton onClick={isNative ? handleLogin : () => loginWithPopup()}>{t('label.login')}</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
