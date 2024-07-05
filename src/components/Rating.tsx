import type { CSSProperties } from 'react';
import { useCallback } from 'react';
import { IonIcon, IonSpinner, IonText } from '@ionic/react';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';
import { useToast } from '../useHooks/useOpenToast';

type Props = {
  disableInteraction?: boolean;
  style?: CSSProperties;
  userId: string;
};

export function Rating({ disableInteraction = false, style, userId }: Props) {
  const { t } = useTranslation();
  const openToast = useToast();

  const utils = trpc.useUtils();

  const { data, error, isPending } = trpc.user.ratingById.useQuery(userId);

  const {
    error: errorMutate,
    isPending: isPendingMutate,
    mutateAsync,
  } = trpc.user.rateUser.useMutation({
    onError() {
      openToast({ color: 'danger', message: `${t('label.error')}: ${errorMutate?.message}` });
    },
    async onSuccess() {
      await utils.user.ratingById.invalidate(userId);
    },
  });

  const rating = data?.ratingScore ?? 0;
  const numRatings = data?.numRatings ?? 0;

  const getIcon = useCallback(
    (i: number) => {
      let ret = starOutline;

      if (i < rating - 0.25) {
        ret = starHalf;
      }

      if (i < rating - 0.5) {
        ret = star;
      }

      return ret;
    },
    [rating],
  );

  const handleRating = useCallback(
    async (val: number) => {
      if (disableInteraction) {
        return;
      }

      await mutateAsync({ newRating: val, userId: userId });
    },
    [disableInteraction, mutateAsync, userId],
  );

  if (isPending) {
    return <IonSpinner name="dots" style={{ ...style, height: '1rem' }} />;
  }

  if (error) {
    return (
      <p style={style}>
        {t('label.error')}: {error.message}
      </p>
    );
  }

  if (userId === '') {
    return <p style={style}>{t('label.noUserFound')}</p>;
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex', ...style, gap: '0.5rem' }}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        {new Array(5).fill(0).map((_, i) => {
          const icon = getIcon(i);

          return (
            <IonIcon
              key={i}
              color="warning"
              icon={icon}
              style={{ fontSize: '1.5rem' }}
              onClick={async () => {
                await handleRating(i + 1);
              }}
            />
          );
        })}
      </div>

      <IonText>
        {rating.toFixed(1)} ({numRatings})
      </IonText>

      {isPendingMutate && <IonSpinner name="dots" style={{ height: '1rem' }} />}
    </div>
  );
}
