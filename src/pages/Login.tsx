import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { isNative } from "../utils/isNative";

export function Login() {
  const { loginWithRedirect } = useAuth0();

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
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <h3>Welcome to the Job Search Portal!</h3>

        <IonButton onClick={isNative ? handleLogin : () => loginWithRedirect()}>Login</IonButton>

        <p>{window.location.origin}</p>
      </IonContent>
    </IonPage>
  );
}
