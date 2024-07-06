import type { CSSProperties } from 'react';
import { useCallback } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';

type Props = {
  style?: CSSProperties;
};

export function LanguageSwitcher({ style }: Props) {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;

  const handleChange = useCallback(
    async (newValue: string) => {
      await i18n.changeLanguage(newValue);
    },
    [i18n],
  );

  return (
    <IonSelect
      interface="popover"
      style={style}
      value={currentLanguage}
      onIonChange={async (e) => {
        await handleChange(e.target.value as string);
      }}
    >
      <IonSelectOption value="en-EN">{t('language.en')}</IonSelectOption>
      <IonSelectOption value="de-DE">{t('language.de')}</IonSelectOption>
    </IonSelect>
  );
}
