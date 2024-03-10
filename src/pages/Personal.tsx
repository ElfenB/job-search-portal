import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { cog } from "ionicons/icons";
import { OfferList } from "../components/OfferList";
import { offerListMockData } from "../components/OfferList.mockData";

export function Personal() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personal</IonTitle>

          <IonButton fill="clear" slot="end" routerLink="/personal/settings" routerDirection="forward">
            <IonIcon aria-hidden="true" icon={cog} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Personal</IonTitle>
          </IonToolbar>
        </IonHeader>

        <OfferList offerList={offerListMockData.sort((a, b) => a.id.localeCompare(b.id)).reverse()} />
      </IonContent>
    </IonPage>
  );
}
