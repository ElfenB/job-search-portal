import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { RefresherEventDetail } from '@ionic/react';
import { IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { cog } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';
import { OfferList } from '../components/OfferList';
import { RefreshDragger } from '../components/RefreshDragger';

export function Personal() {
  const { t } = useTranslation();
  const { user } = useAuth0();

  const myOffers = trpc.job.listMy.useQuery(user?.sub ?? '');

  const utils = trpc.useUtils();

  const handleRefresh = useCallback(
    async (e: CustomEvent<RefresherEventDetail>) => {
      await utils.job.listMy.invalidate();
      e.detail.complete();
    },
    [utils.job.listMy],
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('label.personal')}</IonTitle>

          <IonRouterLink
            routerDirection="forward"
            routerLink="/personal/settings"
            slot="end"
            style={{ margin: 'auto 0.5rem auto 0' }}
          >
            <IonIcon aria-hidden="true" icon={cog} style={{ fontSize: '2rem' }} />
          </IonRouterLink>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <RefreshDragger onRefresh={handleRefresh} />

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('label.personal')}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {user ? <OfferList data={myOffers} personal /> : <div>{t('error.userNotLoggedIn')}</div>}
      </IonContent>
    </IonPage>
  );
}
