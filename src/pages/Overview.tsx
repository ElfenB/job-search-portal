import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { OfferList } from "../components/OfferList";
import { useDarkMode } from "../utils/useDarkMode";
import { offerListMockData } from "../components/OfferList.mockData";

export function Overview() {
  const { darkMode } = useDarkMode();

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

            <img
              src={darkMode ? "/jobber-dark.svg" : "/jobber.svg"}
              alt="Jobber logo"
              style={{ height: "3rem" }}
              slot="end"
            />
          </IonToolbar>
        </IonHeader>

        <OfferList offerList={offerListMockData} />
      </IonContent>
    </IonPage>
  );
}
