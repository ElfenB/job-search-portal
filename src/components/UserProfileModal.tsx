import { IonButton, IonButtons, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { UserProfileModalContent } from "./UserProfileModalContent";

type Props = {
  id: string;
  isOpen?: boolean;
  onClose: () => void;
};

export function UserProfileModal({ id, isOpen, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>{t("label.close")}</IonButton>
          </IonButtons>

          <IonTitle>{t("label.profiledetails")}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <UserProfileModalContent id={id} />
    </IonModal>
  );
}
