import { useAppSelector } from '@/redux/store';
import { getGiftCardsColumns } from './GiftCards.data';
import { useGetLoyaltyDashboardGiftCardsQuery } from '@/services/airLoyaltyProgram/dashboard';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { useState } from 'react';

export const useGiftCards = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.OPTIONAL_PAGE_LIMIT);
  const router = useRouter();
  const { loyaltyDashboardDateRange } = useAppSelector(
    (state) => state?.loyaltyProgramDashboard,
  );

  const queryParams = {
    activeFrom: loyaltyDashboardDateRange?.startDate,
    activeTo: loyaltyDashboardDateRange?.endDate,
    limit,
    page,
  };
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    fulfilledTimeStamp,
    refetch,
  } = useGetLoyaltyDashboardGiftCardsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const handleCardNumberClick = (giftCardNumber: string) => {
    router?.push({
      pathname: AIR_LOYALTY_PROGRAM?.GIFT_CARDS_DETAIL,
      query: { giftCardNumber },
    });
  };
  const giftCardsColumns = getGiftCardsColumns(handleCardNumberClick);
  return {
    giftCardsColumns,
    fulfilledTimeStamp,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    refetch,
    setPage,
    setLimit,
  };
};
