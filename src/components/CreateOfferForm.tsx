import { useCallback, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IonButton, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { trpc } from "../api/trpc";
import { useToast } from "../useHooks/useOpenToast";

const initialFormData: { description: string; offerType: "offer" | "request"; title: string } = {
  description: "",
  offerType: "offer",
  title: "",
};

type Props = {
  onClose: () => void;
};

export function CreateOfferForm({ onClose }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const openToast = useToast();

  const utils = trpc.useUtils();

  const { error, isPending, mutateAsync } = trpc.job.create.useMutation({
    async onSuccess() {
      await utils.job.listMy.invalidate();
      await utils.job.list.invalidate();
    },
  });

  const [formData, setFormData] = useState(initialFormData);
  const isFormValid = useMemo(() => Object.values(formData).every((value) => value.trim().length > 0), [formData]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) {
      openToast({ color: "danger", message: t("label.formErrorEmptyValues") });
      return;
    }

    await mutateAsync({
      authorId: user?.sub ?? "",
      description: formData.description,
      offerType: formData.offerType,
      title: formData.title,
    });

    setFormData(initialFormData);
    onClose();
  }, [
    formData.description,
    formData.offerType,
    formData.title,
    isFormValid,
    mutateAsync,
    onClose,
    openToast,
    t,
    user?.sub,
  ]);

  if (error) {
    return (
      <div>
        <p>{t("label.errormessage")}</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <IonList lines="full" style={{ marginBottom: "1rem" }}>
        <form>
          <IonItem>
            <IonInput
              label={t("label.title")}
              labelPlacement="floating"
              name="title"
              onIonInput={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  title: String(e.target.value),
                }));
              }}
            />
          </IonItem>

          <IonItem>
            <IonSelect
              interface="popover"
              label={t("label.offerType")}
              labelPlacement="floating"
              onIonChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  offerType: String(e.target.value) as "offer" | "request",
                }));
              }}
            >
              <IonSelectOption value="offer">{t("offer")}</IonSelectOption>
              <IonSelectOption value="request">{t("request")}</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonTextarea
              autoGrow
              label={t("label.description")}
              labelPlacement="floating"
              onIonInput={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: String(e.target.value),
                }));
              }}
            />
          </IonItem>

          {/* TODO: Save language/country of the user to then filter on only your location */}

          {/* TODO: Image integration */}
          {/* <IonItem>
          <IonLabel>{t("label.image")}</IonLabel>
          <input type="file" />
        </IonItem> */}
        </form>
      </IonList>

      <IonButton disabled={isPending} type="submit" onClick={handleSubmit}>
        {t("label.submit")}
      </IonButton>
    </>
  );
}
