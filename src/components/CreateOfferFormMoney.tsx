import { useState } from 'react';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { ValidatedFormInput } from './ValidatedFormInput';

type Props = {
  onChange: (name: string, value: string, isValid: boolean) => void;
  value?: number | string;
};

export function CreateOfferFormMoney({ onChange, value }: Props) {
  const { t } = useTranslation();

  const [customCurrency, setCustomCurrency] = useState(false);

  const handleSelectChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (value === 'other') {
      setCustomCurrency(true);
      onChange('currency', 'other', false);
    } else {
      setCustomCurrency(false);
      onChange('currency', value, true);
    }
  };

  return (
    <div>
      <IonItem lines="none">
        <ValidatedFormInput
          label={t('label.money')}
          name="money"
          type="number"
          validators={['isPositiveNumber', 'hasMaxTwoDecimals']}
          onChange={onChange}
        >
          <IonSelect
            interface="popover"
            labelPlacement="floating"
            name="currency"
            slot="end"
            value={customCurrency ? 'other' : value}
            onIonChange={handleSelectChange}
          >
            <IonSelectOption value="€">€</IonSelectOption>
            <IonSelectOption value="$">$</IonSelectOption>
            <IonSelectOption value="£">£</IonSelectOption>
            <IonSelectOption value="₹">₹</IonSelectOption>
            <IonSelectOption value="other">{t('label.currencyOther')}</IonSelectOption>
          </IonSelect>
        </ValidatedFormInput>
      </IonItem>

      {/* Other currency, please specify */}
      {customCurrency && (
        <IonItem lines="none">
          <ValidatedFormInput
            label={t('label.currency')}
            maxLength={3}
            name="currency"
            type="text"
            validators={['isNonEmptyString']}
            onChange={onChange}
          />
        </IonItem>
      )}
    </div>
  );
}
