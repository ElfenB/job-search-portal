import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { offerListMockData } from "../components/OfferList.mockData";

export function OfferDetails() {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();

  const [imageHeight, setImageHeight] = useState<"25vh" | undefined>("25vh");

  const toggleImageHeight = useCallback(() => {
    setImageHeight(imageHeight === "25vh" ? undefined : "25vh");
  }, [imageHeight, setImageHeight]);

  const offer = offerListMockData.find((offer) => offer.id === id);

  const { description, image, offerType, title } = offer ?? { title: "Offer not found" };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>

          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {image && (
          <img
            alt={title}
            onClick={toggleImageHeight}
            src={image}
            style={{ height: imageHeight, objectFit: "cover", width: "100%" }}
          />
        )}

        {/* TODO: Make beautiful, look on Kleinanzeigen for reference */}
        <div style={{ padding: "1rem" }}>
          <h2>
            {title} {offerType !== undefined && `(${t(offerType)})`}
          </h2>

          <h3>{t("label.offerdetails")}</h3>
          <p>{description}</p>
        </div>

        {/* <pre>{JSON.stringify(offer, null, 2)}</pre> */}
      </IonContent>
    </IonPage>
  );
}
