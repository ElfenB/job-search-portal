import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router-dom";
import { offerListMockData } from "../components/OfferList.mockData";
import { useCallback, useState } from "react";

export function OfferDetails() {
  const { id } = useParams<{ id: string }>();

  const [imageHeight, setImageHeight] = useState<"25vh" | undefined>("25vh");

  const toggleImageHeight = useCallback(
    () => setImageHeight(imageHeight === "25vh" ? undefined : "25vh"),
    [imageHeight, setImageHeight],
  );

  const offer = offerListMockData.find((offer) => offer.id === id);

  const { title, image, description, offerType } = offer ?? { title: "Offer not found" };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {image && (
          <img
            onClick={toggleImageHeight}
            src={image}
            alt={title}
            style={{ width: "100%", objectFit: "cover", height: imageHeight }}
          />
        )}

        {/* TODO: Make beautiful, look on Kleinanzeigen for reference */}
        <div style={{ padding: "1rem" }}>
          <h2>
            {title} ({offerType})
          </h2>
          <h3>Offer details</h3>
          <p>{description}</p>
        </div>

        {/* <pre>{JSON.stringify(offer, null, 2)}</pre> */}
      </IonContent>
    </IonPage>
  );
}
