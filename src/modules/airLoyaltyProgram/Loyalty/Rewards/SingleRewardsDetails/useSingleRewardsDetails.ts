import { useEffect, useState } from 'react';
import { singleRewardDetailsColumnsDynamic } from './SingleRewardsDetails.data';
import { PAGINATION } from '@/config';
import { useLazyGetAllLoyaltyPhysicalRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards/physical';

export const useSingleRewardsDetails = (props: any) => {
  const { isRewardDetailsOpen } = props;
  const singleRewardDetailsColumns = singleRewardDetailsColumnsDynamic?.(
    isRewardDetailsOpen?.rewardType,
  );
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
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

  return {
    singleRewardDetailsColumns,
    setSearch,
    setPage,
    setPageLimit,
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
  };
};
