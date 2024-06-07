import { useCallback } from "react";
import type { RefresherEventDetail } from "@ionic/react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { trpc } from "../api/trpc";
import { OfferList } from "../components/OfferList";
import { RefreshDragger } from "../components/RefreshDragger";
import { useDarkMode } from "../utils/useDarkMode";

export function Overview() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  const utils = trpc.useUtils();

  const handleRefresh = useCallback(
    async (e: CustomEvent<RefresherEventDetail>) => {
      await utils.job.list.invalidate();
      e.detail.complete();
    },
    [utils.job.list],
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
