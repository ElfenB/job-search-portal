import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { RefresherEventDetail } from '@ionic/react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';
import { Logo } from '../components/Logo';
import { OfferList } from '../components/OfferList';
import { RefreshDragger } from '../components/RefreshDragger';

export function Overview() {
  const { t } = useTranslation();
  const { user } = useAuth0();

  const isIos = isPlatform('ios');

  const offers = trpc.job.list.useQuery(user?.sub ?? '');

  const utils = trpc.useUtils();

  const handleRefresh = useCallback(
    async (e: CustomEvent<RefresherEventDetail>) => {
      await utils.job.list.invalidate();
      e.detail.complete();
    },
    [utils.job.list],
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('label.overview')}</IonTitle>

          {!isIos && <Logo slot="end" />}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <RefreshDragger onRefresh={handleRefresh} />

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('label.overview')}</IonTitle>

            {isIos && <Logo slot="end" />}
          </IonToolbar>
        </IonHeader>

        <OfferList data={offers} />
      </IonContent>
    </IonPage>
  );
}
