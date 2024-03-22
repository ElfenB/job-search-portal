import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { isNative } from "../utils/isNative";

export function Login() {
  const { t } = useTranslation();
  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
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
          <IonTitle>{t("label.login")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            paddingBottom: "10vh",
          }}
        >
          <h3>{t("welcomemessage")}</h3>

          <IonButton onClick={isNative ? handleLogin : () => loginWithPopup()}>{t("label.login")}</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
