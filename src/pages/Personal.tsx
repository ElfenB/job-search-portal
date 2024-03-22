import { useAuth0 } from "@auth0/auth0-react";
import { IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import { cog } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { fallbackUserImage } from "../components/ChatList.consts";
import { OfferList } from "../components/OfferList";
import { offerListMockData } from "../components/OfferList.mockData";

export function Personal() {
  const { t } = useTranslation();

  const { user } = useAuth0();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("label.personal")}</IonTitle>

          <IonRouterLink
            routerDirection="forward"
            routerLink="/personal/settings"
            slot="end"
            style={{ margin: "auto 0.5rem auto 0" }}
          >
            <IonIcon aria-hidden="true" icon={cog} style={{ fontSize: "2rem" }} />
          </IonRouterLink>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t("label.personal")}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <OfferList
          offerList={offerListMockData
            .sort((a, b) => a.id.localeCompare(b.id))
            .reverse()
            .map((o) => ({ ...o, person: { ...o.person, picture: user?.picture ?? fallbackUserImage } }))}
        />
      </IonContent>
    </IonPage>
  );
}
