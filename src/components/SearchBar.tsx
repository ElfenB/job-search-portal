import { useCallback } from 'react';
import { IonSearchbar } from '@ionic/react';
import type { Offer } from '@prisma/client';
import { useTranslation } from 'react-i18next';

type Props = {
  data: Offer[];
  setResults: (results: Offer[]) => void;
};

export function SearchBar({ data, setResults }: Props) {
  const { t } = useTranslation();

  const handleInput = useCallback(
    (ev: Event) => {
      let query = '';
      const target = ev.target as HTMLIonSearchbarElement | null;
      if (target?.value) query = target.value.toLowerCase();

      setResults(data.filter((d) => d.title.toLowerCase().includes(query)));
    },
    [data, setResults],
  );

  return (
    <IonSearchbar
      animated
      debounce={200}
      placeholder={t('label.search')}
      showClearButton="focus"
      onIonInput={(ev) => {
        handleInput(ev);
      }}
    />
  );
}
