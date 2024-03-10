import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { cog } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { OfferList } from "../components/OfferList";
import { offerListMockData } from "../components/OfferList.mockData";

export function Personal() {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("label.personal")}</IonTitle>

          <IonButton fill="clear" routerDirection="forward" routerLink="/personal/settings" slot="end">
            <IonIcon aria-hidden="true" icon={cog} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t("label.personal")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <OfferList offerList={offerListMockData.sort((a, b) => a.id.localeCompare(b.id)).reverse()} />
      </IonContent>
    </IonPage>
  );
}
