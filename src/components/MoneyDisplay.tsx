import { IonText } from '@ionic/react';
import { useTranslation } from 'react-i18next';

type Props = {
  currency: null | string;
  money: null | number;
  paymentType: null | string;
};

export function MoneyDisplay({ currency, money, paymentType }: Props) {
  const { t } = useTranslation();

  if (money === null) {
    return <></>;
  }

  return (
    <IonText color="primary" style={{ fontWeight: 'bold' }}>
      <p>
        {money} {currency} ({t(paymentType ?? 'label.paymentTypeNotSpecified')})
      </p>
    </IonText>
  );
}
