import { useCallback } from 'react';
import { IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { trpc } from '../api/trpc';
import { BackButton } from '../components/BackButton';
import { OfferDetailsView } from '../components/OfferDetailsView';
import { useToast } from '../useHooks/useOpenToast';

export function OfferDetails() {
  const { t } = useTranslation();
  const openToast = useToast();

  const { id } = useParams<{ id: string }>();

  // Convert id to number
  const offerId = parseInt(id, 10);

  const utils = trpc.useUtils();

  const { data, error, isPending } = trpc.job.byId.useQuery(offerId);

  const {
    error: errorMutate,
    isPending: isPendingMutate,
    mutateAsync,
  } = trpc.job.delete.useMutation({
    onError() {
      openToast({ color: 'danger', message: `${t('label.error')}: ${errorMutate?.message}` });
    },
    async onSuccess() {
      await utils.job.listAll.invalidate();
      await utils.job.listMy.invalidate();
    },
  });

  const handleDeleteOffer = useCallback(async () => {
    await mutateAsync(offerId);
    history.back();
  }, [mutateAsync, offerId]);

  if (isPending) {
    return <IonLoading isOpen />;
  }

  if (error !== null || !data) {
    return <IonPage>{t('error.errorLoadingOffer')}</IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>

          <IonTitle>{data.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <OfferDetailsView offer={data} onDelete={handleDeleteOffer} />

        <IonLoading isOpen={isPendingMutate} />
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </IonContent>
    </IonPage>
  );
}
