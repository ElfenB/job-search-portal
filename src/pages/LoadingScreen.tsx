import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { t } from "i18next";

export function LoadingScreen() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("label.loading")} ...</IonTitle>
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
          <h3>{t("label.loading")} ...</h3>

          <IonSpinner />
        </div>
      </IonContent>
    </IonPage>
  );
}
