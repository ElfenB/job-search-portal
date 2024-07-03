import { useEffect, useState } from 'react';
import type { Offer } from '@prisma/client';
import type { UseTRPCQueryResult } from '@trpc/react-query/dist/shared/hooks/types';
import { TRPCError } from '@trpc/server';
import { useTranslation } from 'react-i18next';
import { ContentPlaceholderMessage } from './ContentPlaceholderMessage';
import { CreateOfferCard } from './CreateOfferCard';
import { OfferCard } from './OfferCard';
import { OfferListSkeleton } from './OfferListSkeleton';
import { SearchBar } from './SearchBar';

type Props = {
  data: UseTRPCQueryResult<Offer[], unknown>;
  disableItemClick?: boolean;
  personal?: boolean;
};

export function OfferList({ data: query, disableItemClick, personal }: Props) {
  const { t } = useTranslation();

  const { data, error, isPending } = query;

  const [filteredOffers, setFilteredOffers] = useState(data ?? []);

  useEffect(() => {
    if (data) {
      setFilteredOffers(data);
    }
  }, [data]);

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

      {!personal && <SearchBar data={data} setResults={setFilteredOffers} />}

      {filteredOffers.length === 0 && <ContentPlaceholderMessage message={t('label.noOffersFound')} />}

      {filteredOffers.map((offer) => (
        <OfferCard key={offer.id} disableClick={disableItemClick} offer={offer} />
      ))}
    </>
  );
}
