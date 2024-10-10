import { useEffect, useState } from 'react';
import { singleRewardDetailsColumnsDynamic } from './SingleRewardsDetails.data';
import { PAGINATION } from '@/config';
import { useLazyGetAllLoyaltyPhysicalRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards/physical';

export const useSingleRewardsDetails = () => {
  const singleRewardDetailsColumns = singleRewardDetailsColumnsDynamic?.();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [
    lazyGetAllLoyaltyPhysicalRewardsListTrigger,
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
  ]: any = useLazyGetAllLoyaltyPhysicalRewardsListQuery?.();

  const getAllLoyaltyPhysicalRewardsList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetAllLoyaltyPhysicalRewardsListTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getAllLoyaltyPhysicalRewardsList?.();
  }, [page, search, pageLimit]);

  const refetch = () => getAllLoyaltyPhysicalRewardsList?.();

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    singleRewardDetailsColumns,
    setPage,
    setPageLimit,
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
    refetch,
    handleSearch,
  };
};
