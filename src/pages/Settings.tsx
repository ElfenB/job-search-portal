import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { BackButton } from '../components/BackButton';
import { Feedback } from '../components/Feedback';
import { SettingsList } from '../components/SettingsList';
import { UserProfile } from '../components/UserProfile';
import { isNative } from '../utils/isNative';

export function Settings() {
  const { t } = useTranslation();

  const { logout } = useAuth0();

  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;

  // This should reflect the URL added to the "Allowed Logout URLs" setting in the Auth0 dashboard.
  const logoutUri = useMemo(() => {
    if (isNative) {
      return `com.benelfen.jobsearchportal://${auth0Domain}/capacitor/com.benelfen.jobsearchportal/callback`;
    }

    return window.location.origin;
  }, [auth0Domain]);

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
      },
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: '_self',
        });
      },
    });
  };

  const appVersion = useMemo(() => import.meta.env.VITE_APP_VERSION, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>

          <IonTitle>{t('label.settings')}</IonTitle>

          <IonButtons slot="end">
            <IonButton color="danger" onClick={isNative ? handleLogout : () => logout()}>
              {t('label.logout')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <UserProfile />

        <SettingsList style={{ marginBottom: '2rem' }} />

        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Feedback />

          <IonButton fill="clear" onClick={() => window.open('https://github.com/ElfenB/job-search-portal')}>
            <IonIcon icon={logoGithub} size="large" />
          </IonButton>

          {appVersion && <IonLabel color="medium">v{appVersion}</IonLabel>}
        </div>
      </IonContent>
    </IonPage>
  );
}
