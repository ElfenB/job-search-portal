import { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { CreateOfferForm } from './CreateOfferForm';

export function CreateOfferCard() {
  const { t } = useTranslation();

  const [creating, setCreating] = useState(false);

  return (
    <IonCard>
      <IonCardHeader>
        {/* <IonCardTitle>{t("label.createEntry")}</IonCardTitle> */}
        <IonButton
          fill="outline"
          style={{ width: '100%' }}
          onClick={() => {
            setCreating(!creating);
          }}
        >
          {creating ? t('label.cancel') : t('label.createEntry')}
        </IonButton>
        {/* <IonCardSubtitle>{t(offerType)}</IonCardSubtitle> */}
      </IonCardHeader>

      {creating && (
        <IonCardContent>
          <CreateOfferForm
            onClose={() => {
              setCreating(false);
            }}
          />
        </IonCardContent>
      )}
    </IonCard>
  );
}
