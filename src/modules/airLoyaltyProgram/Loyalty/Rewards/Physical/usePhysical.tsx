import { PAGINATION } from '@/config';
import { useLazyGetAllLoyaltyPhysicalRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards/physical';
import { useEffect, useState } from 'react';
import { loyaltyPhysicalRewardColumnDynamic } from './Physical.data';
import { getActivePermissionsSession } from '@/utils';

export const usePhysical = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [isRewardDetailsOpen, setIsRewardDetailsOpen] = useState({
    isOpen: false,
    rewardType: '',
  });
  const overallPermissions = getActivePermissionsSession();

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

  const loyaltyPhysicalRewardColumn = loyaltyPhysicalRewardColumnDynamic?.(
    setIsRewardDetailsOpen,
    overallPermissions,
  );

  return {
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyPhysicalRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
  };
};
