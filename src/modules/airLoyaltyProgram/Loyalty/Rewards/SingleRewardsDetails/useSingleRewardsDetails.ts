import { useEffect, useState } from 'react';
import { singleRewardDetailsColumnsDynamic } from './SingleRewardsDetails.data';
import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyProgramRewardsDetailsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards';

export const useSingleRewardsDetails = (props: any) => {
  const { isRewardDetailsOpen } = props;

  const singleRewardDetailsColumns = singleRewardDetailsColumnsDynamic?.();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [lazyGetRewardsListTrigger, lazyGetRewardsListStatus]: any =
    useLazyGetLoyaltyProgramRewardsDetailsListQuery?.();

  const getRewardsList = async () => {
    const apiDataParameter = {
      pathParams: {
        id: isRewardDetailsOpen?.rewardType,
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

  const redeemRewardData =
    lazyGetRewardsListStatus?.data?.data?.redeemedConsumersList;

  return {
    singleRewardDetailsColumns,
    setPage,
    setPageLimit,
    lazyGetRewardsListStatus,
    refetch,
    handleSearch,
    redeemRewardData,
  };
};
