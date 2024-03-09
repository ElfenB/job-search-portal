import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { OfferList } from "../components/OfferList";

export function Overview() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Overview</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Overview</IonTitle>
          </IonToolbar>
        </IonHeader>

        <OfferList />
      </IonContent>
    </IonPage>
  );
}
