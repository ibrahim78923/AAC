import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyAllRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards';
import { useEffect, useState } from 'react';
import { loyaltyAllRewardColumnDynamic } from './AllRewards.data';
import { getActivePermissionsSession } from '@/utils';

export const useAllRewards = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const overallPermissions = getActivePermissionsSession();

  const [isRewardDetailsOpen, setIsRewardDetailsOpen] = useState({
    isOpen: false,
    rewardType: '',
  });
  const [
    lazyGetLoyaltyAllRewardsListTrigger,
    lazyGetLoyaltyAllRewardsListStatus,
  ]: any = useLazyGetLoyaltyAllRewardsListQuery?.();

  const getAllLoyaltyAllRewardsList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetLoyaltyAllRewardsListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getAllLoyaltyAllRewardsList?.();
  }, [page, search, pageLimit]);

  const loyaltyAllRewardColumn = loyaltyAllRewardColumnDynamic?.(
    setIsRewardDetailsOpen,
    overallPermissions,
  );

  return {
    lazyGetLoyaltyAllRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyAllRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
  };
};
