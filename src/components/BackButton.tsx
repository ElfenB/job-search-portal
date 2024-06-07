import { IonBackButton } from '@ionic/react';
import { useTranslation } from 'react-i18next';

export function BackButton() {
  const { t } = useTranslation();

  return <IonBackButton text={t('label.backbutton')} />;
}
