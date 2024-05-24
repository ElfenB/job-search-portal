import { useCallback, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { trpc } from "../api/trpc";
import { BackButton } from "../components/BackButton";
import { useToast } from "../useHooks/useOpenToast";

export function OfferDetails() {
  const { t } = useTranslation();
  const openToast = useToast();

  const { id } = useParams<{ id: string }>();

  // Convert id to number
  const offerId = parseInt(id, 10);

  const utils = trpc.useUtils();

  const { data, error, isPending } = trpc.job.byId.useQuery(offerId);

  const {
    error: errorMutate,
    isPending: isPendingMutate,
    mutateAsync,
  } = trpc.job.delete.useMutation({
    onError() {
      openToast({ color: "danger", message: `${t("label.error")}: ${errorMutate?.message}` });
    },
    async onSuccess() {
      await utils.job.list.invalidate();
      await utils.job.listMy.invalidate();
    },
  });

  const handleDeleteOffer = useCallback(async () => {
    await mutateAsync(offerId);
    history.back();
  }, [mutateAsync, offerId]);

  const [imageHeight, setImageHeight] = useState<"25vh" | undefined>("25vh");

  const toggleImageHeight = useCallback(() => {
    setImageHeight(imageHeight === "25vh" ? undefined : "25vh");
  }, [imageHeight, setImageHeight]);

  if (isPending) {
    return <IonPage>Loading...</IonPage>;
  }

  if (error) {
    return <IonPage>{t("error.errorLoadingOffer")}</IonPage>;
  }

  const { description, image, offerType, title } = data ?? { title: t("label.offernotfound") };

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
          <div role="button" tabIndex={0} onClick={toggleImageHeight} onKeyDown={toggleImageHeight}>
            <img alt={title} src={image} style={{ height: imageHeight, objectFit: "cover", width: "100%" }} />
          </div>
        )}

        {/* TODO: Make beautiful, look on Kleinanzeigen for reference */}
        <div style={{ padding: "1rem" }}>
          <h2>
            {title} {offerType !== undefined && `(${t(offerType)})`}
          </h2>

          {title !== "" && (
            <div>
              <h3>{t("label.offerdetails")}</h3>
              <p>{description}</p>
            </div>
          )}
        </div>

        {/* ID triggers IonAlert */}
        <IonButton color="danger" id="present-alert">
          <IonIcon icon={trash} />
        </IonButton>

        {/* Is triggered by id from IonButton */}
        <IonAlert
          buttons={[
            { role: "cancel", text: t("label.cancel") },
            { handler: () => handleDeleteOffer(), role: "confirm", text: t("label.delete") },
          ]}
          header={t("label.deleteOfferConfirmation")}
          trigger="present-alert"
          // onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
        />

        <IonLoading isOpen={isPendingMutate} />

        {/* <pre>{JSON.stringify(offer, null, 2)}</pre> */}
      </IonContent>
    </IonPage>
  );
}
