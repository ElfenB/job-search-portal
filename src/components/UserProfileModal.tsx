import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircleSharp } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { trpc } from "../api/trpc";
import { OfferList } from "./OfferList";
import { Divider } from "./Divider";

type Props = {
  id: string;
  isOpen?: boolean;
  onClose: () => void;
};

export function UserProfileModal({ id, isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const { data: person, error, isPending } = trpc.user.byId.useQuery(id);

  const offers = trpc.job.listUser.useQuery(id);

  if (isPending) {
    return (
      <IonModal isOpen={isOpen} trigger="open-modal" onDidDismiss={onClose}>
        <IonContent className="ion-padding">
          <p>Loading...</p>
        </IonContent>
      </IonModal>
    );
  }

  if (!person || error) {
    return (
      <IonModal isOpen={isOpen} trigger="open-modal" onDidDismiss={onClose}>
        <IonContent className="ion-padding">
          <p>Error: {error.message}</p>
        </IonContent>
      </IonModal>
    );
  }

  return (
    <IonModal isOpen={isOpen} trigger="open-modal" onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>{t("label.close")}</IonButton>
          </IonButtons>

          <IonTitle>{person.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAvatar style={{ height: "8rem", margin: "0 auto", width: "8rem" }}>
          <img alt={person.name} src={person.picture} />
        </IonAvatar>

        <IonList lines="full">
          <IonListHeader>{t("label.profiledetails")}</IonListHeader>

          <IonItem>
            <IonLabel style={{ alignItems: "center", display: "flex" }}>
              <b>{t("label.email")}:</b> {person.email}
              {person.email_verified && (
                <IonIcon icon={checkmarkCircleSharp} style={{ color: "green", marginLeft: "0.2rem" }} />
              )}
            </IonLabel>
          </IonItem>

          {person.created_at && (
            <IonItem>
              <IonLabel>
                <b>{t("label.membersince")}:</b> {new Date(person.created_at as Date).toLocaleDateString()}
              </IonLabel>
            </IonItem>
          )}

          {person.last_login && (
            <IonItem>
              <IonLabel>
                <b>{t("label.lastlogin")}:</b> {new Date(person.last_login as Date).toLocaleDateString()}
              </IonLabel>
            </IonItem>
          )}

          {person.logins_count && (
            <IonItem lines="none">
              <IonLabel>
                <b>{t("label.loginscount")}:</b> {person.logins_count}
              </IonLabel>
            </IonItem>
          )}
        </IonList>

        <Divider />

        <IonList>
          <IonListHeader>{t("label.offers")}</IonListHeader>
        </IonList>

        <OfferList data={offers} />
      </IonContent>
    </IonModal>
  );
}
