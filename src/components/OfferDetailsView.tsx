import { useCallback, useState } from "react";
import { IonAlert, IonButton, IonIcon, IonItemDivider, IonLabel, IonText } from "@ionic/react";
import type { Offer } from "@prisma/client";
import { calendarOutline, eye, locationOutline, trash } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { Divider } from "./Divider";
import { InfoItem } from "./InfoItem";
import { OfferDetailsSection } from "./OfferDetailsSection";
import { UserAvatar } from "./UserAvatar";

type Props = {
  offer: Offer;
  onDelete: () => void;
};

export function OfferDetailsView({ offer, onDelete }: Props) {
  const { t } = useTranslation();

  const { authorId, createdAt, currency, description, image, location, money, offerType, paymentType, title, views } =
    offer;

  const [imageHeight, setImageHeight] = useState<"25vh" | undefined>("25vh");

  const toggleImageHeight = useCallback(() => {
    setImageHeight(imageHeight === "25vh" ? undefined : "25vh");
  }, [imageHeight, setImageHeight]);

  return (
    <>
      {image && (
        <div role="button" tabIndex={0} onClick={toggleImageHeight} onKeyDown={toggleImageHeight}>
          <img alt={title} src={image} style={{ height: imageHeight, objectFit: "cover", width: "100%" }} />
        </div>
      )}

      <OfferDetailsSection>
        <h2>
          {title} {`(${t(offerType)})`}
        </h2>

        {money === null ? (
          <></>
        ) : (
          <IonText color="primary" style={{ fontWeight: "bold" }}>
            <p>
              {money} {currency} ({t(paymentType ?? "label.paymentTypeNotSpecified")})
            </p>
          </IonText>
        )}

        <InfoItem icon={locationOutline}>{location}</InfoItem>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <InfoItem icon={calendarOutline}>{createdAt.toLocaleDateString()}</InfoItem>
          <InfoItem icon={eye} style={{ marginLeft: "1rem" }}>
            {String(views)}
          </InfoItem>
        </div>
      </OfferDetailsSection>

      <Divider />

      <OfferDetailsSection>
        {title === "" ? (
          <></>
        ) : (
          <div>
            <h3>{t("label.offerdetails")}</h3>
            <p>{description}</p>
          </div>
        )}
      </OfferDetailsSection>

      <Divider />

      <OfferDetailsSection>
        <UserAvatar userId={authorId} withName />
      </OfferDetailsSection>

      <Divider />

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
