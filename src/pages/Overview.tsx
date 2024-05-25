import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, RefresherEventDetail } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { OfferList } from "../components/OfferList";
import { useDarkMode } from "../utils/useDarkMode";
import { useCallback } from "react";
import { trpc } from "../api/trpc";
import { RefreshDragger } from "../components/RefreshDragger";

export function Overview() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  const utils = trpc.useUtils();

  const handleRefresh = useCallback(
    async (e: CustomEvent<RefresherEventDetail>) => {
      await utils.job.list.invalidate();
      e.detail.complete();
    },
    [utils.job.list, utils.job.listMy],
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("label.overview")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <RefreshDragger onRefresh={handleRefresh} />

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
