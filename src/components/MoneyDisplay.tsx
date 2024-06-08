import { IonText } from "@ionic/react";
import { useTranslation } from "react-i18next";

type Props = {
  money: number | null;
  currency: string | null;
  paymentType: string | null;
};

export function MoneyDisplay({ money, currency, paymentType }: Props) {
  const { t } = useTranslation();

  if (money === null) {
    return <></>;
  }

  return (
    <IonText color="primary" style={{ fontWeight: "bold" }}>
      <p>
        {money} {currency} ({t(paymentType ?? "label.paymentTypeNotSpecified")})
      </p>
    </IonText>
  );
}
