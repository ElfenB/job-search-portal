import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { OfferList } from "../components/OfferList";
import { useDarkMode } from "../utils/useDarkMode";

export function Overview() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("label.overview")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t("label.overview")}</IonTitle>

            <img
              alt="Jobber logo"
              slot="end"
              src={darkMode ? "/jobber-dark.svg" : "/jobber.svg"}
              style={{ height: "3rem" }}
            />
          </IonToolbar>
        </IonHeader>

        <OfferList />
      </IonContent>
    </IonPage>
  );
}
