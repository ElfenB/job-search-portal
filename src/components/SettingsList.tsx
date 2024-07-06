import type { CSSProperties } from 'react';
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

type Props = {
  style?: CSSProperties;
};

export function SettingsList({ style }: Props) {
  const { t } = useTranslation();

  return (
    <IonList style={style}>
      <IonListHeader>
        <IonLabel>{t('label.settings')}</IonLabel>
      </IonListHeader>

      <IonItem>
        <IonLabel>{t('label.language')}</IonLabel>
        <LanguageSwitcher />
      </IonItem>
    </IonList>
  );
}
