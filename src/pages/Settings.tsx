import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { BackButton } from "../components/BackButton";
import { UserProfile } from "../components/UserProfile";
import { isNative } from "../utils/isNative";

// This should reflect the URL added earlier to your "Allowed Logout URLs" setting
// in the Auth0 dashboard.
const logoutUri =
  "com.benelfen.jobsearchportal://elfenben.eu.auth0.com/capacitor/com.benelfen.jobsearchportal/callback";

export function Settings() {
  const { t } = useTranslation();

  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: logoutUri,
      },
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self",
        });
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>

          <IonTitle>{t("label.settings")}</IonTitle>

          <IonButtons slot="end">
            <IonButton color="danger" onClick={isNative ? handleLogout : () => logout()}>
              {t("label.logout")}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <UserProfile />
      </IonContent>
    </IonPage>
  );
}
