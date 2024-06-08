import type { Offer } from '@prisma/client';
import type { UseTRPCQueryResult } from '@trpc/react-query/dist/shared/hooks/types';
import { TRPCError } from '@trpc/server';
import { useTranslation } from 'react-i18next';
import { ContentPlaceholderMessage } from './ContentPlaceholderMessage';
import { CreateOfferCard } from './CreateOfferCard';
import { OfferCard } from './OfferCard';
import { OfferListSkeleton } from './OfferListSkeleton';

type Props = {
  data: UseTRPCQueryResult<Offer[], unknown>;
  personal?: boolean;
};

export function OfferList({ data: query, personal }: Props) {
  const { t } = useTranslation();

  const { data, error, isPending } = query;

  if (isPending) {
    return <OfferListSkeleton />;
  }

  if (!data || error) {
    if (error instanceof TRPCError) {
      return <ContentPlaceholderMessage color="red" message={`${t('label.error')}: ${error.message}`} />;
    }
    return <ContentPlaceholderMessage color="red" message={t('label.error')} />;
  }

  return (
    <>
      {personal && <CreateOfferCard />}

      {data.length === 0 && <ContentPlaceholderMessage message={t('label.noOffersFound')} />}

      {data.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </>
  );
}
