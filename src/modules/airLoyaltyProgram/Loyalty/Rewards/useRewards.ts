import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';
import { loyaltyRewardColumnDynamic } from './Rewards.data';
import { useRouter } from 'next/router';
import { useLazyGetLoyaltyProgramRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards';
import { getActivePermissionsSession } from '@/utils';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';

export const useRewards = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isRewardDrawerOpen, setIsRewardDrawerOpen] = useState({
    isOpen: false,
    data: '',
  });

  const [isRewardDetailsOpen, setIsRewardDetailsOpen] = useState({
    isOpen: false,
    rewardType: '',
  });
  const [
    lazyGetLoyaltyRewardsListTrigger,
    lazyGetLoyaltyRewardsListStatus,
  ]: any = useLazyGetLoyaltyProgramRewardsListQuery?.();

  const getLoyaltyRewardsList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
        type: LOYALTY_REWARDS_TYPE?.ALL,
      },
    };
    try {
      await lazyGetLoyaltyRewardsListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getLoyaltyRewardsList?.();
  }, [page, search, pageLimit]);

  const activePermissionOfEditDelete = getActivePermissionsSession()?.includes(
    AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.EDIT_DELETE_REWARDS,
  );
  const overallPermissions = getActivePermissionsSession();

  const loyaltyAllRewardColumn = loyaltyRewardColumnDynamic?.(
    setIsRewardDetailsOpen,
    activePermissionOfEditDelete,
    overallPermissions,
  );

  const refetch = () => getLoyaltyRewardsList?.();

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  return {
    lazyGetLoyaltyRewardsListStatus,
    setPageLimit,
    setPage,
    loyaltyAllRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
    router,
    refetch,
    isRewardDrawerOpen,
    setIsRewardDrawerOpen,
    handleSearch,
  };
};
