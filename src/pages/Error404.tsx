import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";

type Props = {
  message?: string;
};

export function ErrorPage({ message }: Props) {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("label.error")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <h1>{message ?? t("label.errormessage")}</h1>
      </IonContent>
    </IonPage>
  );
}
