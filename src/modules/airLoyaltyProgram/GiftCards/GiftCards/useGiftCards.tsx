import { useRouter } from 'next/router';
import { useState } from 'react';
import { giftCardColumnsFunction } from './GiftCards.data';
import { AddGiftCards } from './AddGiftCards';
import { GiftCardFilter } from './GiftCardsFilter';
import { PAGINATION } from '@/config';
import {
  useGetGiftCardListQuery,
  usePutGiftCardStatusMutation,
} from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';

export const useGiftCards = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterGiftCard, setFilterGiftCard] = useState<any>({});
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const router = useRouter();

  const giftCardParams = {
    page,
    limit,
    ...(search && { search }),
    ...(filterGiftCard?.maxAmount && {
      maxcurrentamount: filterGiftCard?.maxAmount,
    }),
    ...(filterGiftCard?.minAmount && {
      minicurrentamount: filterGiftCard?.minAmount,
    }),
    ...(filterGiftCard?.dateRange?.startDate && {
      activeFrom: otherDateFormat(
        filterGiftCard?.dateRange?.startDate,
        CALENDAR_FORMAT?.YMD,
      ),
    }),
    ...(filterGiftCard?.dateRange?.endDate && {
      activeTo: otherDateFormat(
        filterGiftCard?.dateRange?.endDate,
        CALENDAR_FORMAT?.YMD,
      ),
    }),
    ...(filterGiftCard?.status && { status: filterGiftCard?.status }),
  };

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const { data, isFetching, isLoading, isError, isSuccess, refetch } =
    useGetGiftCardListQuery<any>(giftCardParams, {
      refetchOnMountOrArgChange: true,
    });

  const handleRefetchList = async () => {
    await refetch();
  };

  const giftCardColumns = giftCardColumnsFunction(
    router,
    usePutGiftCardStatusMutation,
    handleRefetchList,
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
          handleRefetchList={handleRefetchList}
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
