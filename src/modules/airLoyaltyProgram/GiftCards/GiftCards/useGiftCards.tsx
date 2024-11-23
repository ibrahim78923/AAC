import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { giftCardColumnsFunction } from './GiftCards.data';
import { AddGiftCards } from './AddGiftCards';
import { GiftCardFilter } from './GiftCardsFilter';
import { PAGINATION } from '@/config';
import {
  useLazyGetGiftCardListQuery,
  usePutGiftCardStatusMutation,
} from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar } from '@/lib/snackbar';

export const useGiftCards = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterGiftCard, setFilterGiftCard] = useState({});
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();

  const giftCardParams = {
    page,
    limit,
    search,
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const [
    getGiftCardListTrigger,
    { data, isFetching, isLoading, isError, isSuccess },
  ] = useLazyGetGiftCardListQuery<any>();

  const handleGiftCard = async () => {
    try {
      await getGiftCardListTrigger(giftCardParams);
    } catch (error) {
      errorSnackbar(error ?? 'Error while fetching gift card list');
    }
  };

  useEffect(() => {
    handleGiftCard();
  }, [page, limit, search]);

  const giftCardColumns = giftCardColumnsFunction(
    router,
    usePutGiftCardStatusMutation,
    handleGiftCard,
  );

  const renderPortalComponent = () => {
    if (isPortalOpen?.isFilter) {
      return (
        <GiftCardFilter
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          filterGiftCard={filterGiftCard}
          setFilterGiftCard={setFilterGiftCard}
          setPage={setPage}
        />
      );
    }
    if (isPortalOpen?.isAdd) {
      return (
        <AddGiftCards
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      );
    }
    return <></>;
  };

  return {
    giftCardColumns,
    handleSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    setPage,
    setPageLimit,
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  };
};
