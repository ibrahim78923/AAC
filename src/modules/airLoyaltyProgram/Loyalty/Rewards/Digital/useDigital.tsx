import { PAGINATION } from '@/config';
import { useLazyGetAllLoyaltyDigitalRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards/digital';
import { useEffect, useState } from 'react';
import { loyaltyDigitalRewardColumnDynamic } from './Digital.data';
import { useRouter } from 'next/router';

export const useDigital = () => {
  const router = useRouter?.();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');

  const [
    lazyGetAllLoyaltyDigitalRewardsListTrigger,
    lazyGetAllLoyaltyDigitalRewardsListStatus,
  ]: any = useLazyGetAllLoyaltyDigitalRewardsListQuery?.();

  const getAllLoyaltyDigitalRewardsList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetAllLoyaltyDigitalRewardsListTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getAllLoyaltyDigitalRewardsList?.();
  }, [page, search, pageLimit]);

  const loyaltyDigitalRewardColumn =
    loyaltyDigitalRewardColumnDynamic?.(router);

  return {
    lazyGetAllLoyaltyDigitalRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyDigitalRewardColumn,
  };
};
