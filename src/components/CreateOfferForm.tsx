import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IonButton, IonItem, IonList, IonSelect, IonSelectOption, IonText, IonTextarea } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';
import { useToast } from '../useHooks/useOpenToast';
import { CreateOfferFormMoney } from './CreateOfferFormMoney';
import { ValidatedFormInput } from './ValidatedFormInput';

const borderStyle = { borderBottom: '0.55px solid var(--border-color)' };

// isValid option used for form validation
type NewOffer = {
  authorId: { isValid: boolean; v: string };
  currency: { isValid: boolean; v?: string };
  description: { isValid: boolean; v?: string };
  image: { isValid: boolean; v?: string };
  location: { isValid: boolean; v?: string };
  money: { isValid: boolean; v?: number };
  offerType: { isValid: boolean; v: 'offer' | 'request' };
  paymentType: { isValid: boolean; v?: string };
  title: { isValid: boolean; v: string };
};

// Optional values are valid by default
const initialFormData: NewOffer = {
  authorId: { isValid: true, v: '' },
  currency: { isValid: true, v: '€' },
  description: { isValid: true, v: '' },
  image: { isValid: true, v: undefined },
  location: { isValid: true, v: undefined },
  money: { isValid: true, v: undefined },
  offerType: { isValid: false, v: 'offer' },
  paymentType: { isValid: true, v: undefined },
  title: { isValid: false, v: '' },
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

  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const isFormValid = useMemo(() => Object.values(formData).every((value) => value.isValid), [formData]);

  const userLang = navigator.language || navigator.languages[0];
  const userCountry = userLang.split('-')[1];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      location: { isValid: true, v: userCountry },
    }));
  }, [userCountry]);

  const handleFormChange = useCallback((name: string, value: string, isValid: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { isValid, v: value },
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) {
      openToast({ color: 'danger', message: t('label.formErrorEmptyValues') });
      return;
    }

    await mutateAsync({
      authorId: user?.sub ?? '',
      currency: formData.currency.v,
      description: formData.description.v ?? '',
      location: formData.location.v ?? userCountry,
      money: Number(formData.money.v),
      offerType: formData.offerType.v,
      paymentType: formData.paymentType.v,
      title: formData.title.v,
    });

    setFormData(initialFormData);
    onClose();
  }, [
    formData.currency.v,
    formData.description.v,
    formData.location.v,
    formData.money.v,
    formData.offerType.v,
    formData.paymentType.v,
    formData.title.v,
    isFormValid,
    mutateAsync,
    onClose,
    openToast,
    t,
    user?.sub,
    userCountry,
  ]);

  if (error) {
    return (
      <div>
        <p>{t('label.errormessage')}</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <IonList lines="full" style={{ marginBottom: '1rem' }}>
        <form>
          <IonItem lines="none">
            <ValidatedFormInput
              label={t('label.title')}
              maxLength={255}
              name="title"
              type="text"
              validators={['isNonEmptyString']}
              onChange={handleFormChange}
            />
          </IonItem>

          <IonItem lines="none">
            <IonSelect
              interface="popover"
              label={t('label.offerType')}
              labelPlacement="floating"
              style={borderStyle}
              onIonChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  offerType: { isValid: true, v: String(e.target.value) as 'offer' | 'request' },
                }));
              }}
            >
              <IonSelectOption value="offer">{t('offer')}</IonSelectOption>
              <IonSelectOption value="request">{t('request')}</IonSelectOption>
            </IonSelect>
          </IonItem>

          <CreateOfferFormMoney value={formData.currency.v} onChange={handleFormChange} />

          <IonItem lines="none">
            <IonSelect
              interface="popover"
              label={t('label.paymentType')}
              labelPlacement="floating"
              name="paymentType"
              style={borderStyle}
              value={formData.paymentType.v}
              onIonChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  paymentType: { isValid: true, v: String(e.target.value) },
                }));
              }}
            >
              <IonSelectOption value="monthly">{t('label.paymentMonthly')}</IonSelectOption>
              <IonSelectOption value="hourly">{t('label.paymentHourly')}</IonSelectOption>
              <IonSelectOption value="fixed">{t('label.paymentFixed')}</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem lines="none">
            <ValidatedFormInput
              initialValue={userCountry}
              label={t('label.location')}
              name="location"
              type="text"
              validators={['isNonEmptyString']}
              onChange={handleFormChange}
            />
          </IonItem>

          <IonItem lines="none">
            <IonTextarea
              autoGrow
              label={t('label.description')}
              labelPlacement="floating"
              style={borderStyle}
              onIonInput={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: { isValid: true, v: String(e.target.value) },
                }));
              }}
            />
          </IonItem>

          {/* TODO: Image integration */}
          {/* <IonItem>
          <IonLabel>{t("label.image")}</IonLabel>
          <input type="file" />
        </IonItem> */}
        </form>
      </IonList>

      <IonButton disabled={isPending || !isFormValid} type="submit" onClick={handleSubmit}>
        {t('label.submit')}
      </IonButton>

      {!isFormValid && (
        <IonText color="warning">
          <p style={{ marginTop: '1rem' }}>{t('label.fillAllFields')}</p>
        </IonText>
      )}
    </>
  );
}
