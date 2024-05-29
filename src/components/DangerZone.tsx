import { IonAlert, IonButton, IonIcon, IonItemDivider, IonLabel, IonText } from "@ionic/react";
import { trash } from "ionicons/icons";
import { useTranslation } from "react-i18next";

type Props = {
  offerType: string;
  onDelete: () => void;
};

export function DangerZone({ offerType, onDelete }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <IonItemDivider color="danger">
        <IonLabel>{t("label.dangerZone")}</IonLabel>
      </IonItemDivider>

      {/* ID triggers IonAlert */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <IonButton className="ion-padding" color="danger" id="present-alert">
          <IonIcon icon={trash} />
          <IonText style={{ marginLeft: ".5rem" }}>
            <span>
              {t("label.deleteSomething")} {t(offerType)}
            </span>
          </IonText>
        </IonButton>
      </div>

      {/* Is triggered by id from IonButton */}
      <IonAlert
        buttons={[
          { role: "cancel", text: t("label.cancel") },
          {
            handler: () => {
              onDelete();
            },
            role: "confirm",
            text: t("label.delete"),
          },
        ]}
        header={t("label.deleteOfferConfirmation")}
        trigger="present-alert"
      />
    </>
  );
}
