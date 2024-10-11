import { useEffect, useState } from 'react';
import { singleRewardDetailsColumnsDynamic } from './SingleRewardsDetails.data';
import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyProgramRewardsDetailsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards';

export const useSingleRewardsDetails = () => {
  const singleRewardDetailsColumns = singleRewardDetailsColumnsDynamic?.();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [lazyGetRewardsListTrigger, lazyGetRewardsListStatus]: any =
    useLazyGetLoyaltyProgramRewardsDetailsListQuery?.();

  const getRewardsList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetRewardsListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getRewardsList?.();
  }, [page, search, pageLimit]);

  const refetch = () => getRewardsList?.();

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    singleRewardDetailsColumns,
    setPage,
    setPageLimit,
    lazyGetRewardsListStatus,
    refetch,
    handleSearch,
  };
};