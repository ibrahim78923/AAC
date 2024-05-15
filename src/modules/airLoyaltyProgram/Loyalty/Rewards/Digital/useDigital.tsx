import { PAGINATION } from '@/config';
import { useLazyGetAllLoyaltyDigitalRewardsListQuery } from '@/services/airLoyaltyProgram/loyalty/rewards/digital';
import { useEffect, useState } from 'react';
import { loyaltyDigitalRewardColumnDynamic } from './Digital.data';
import { getActivePermissionsSession } from '@/utils';
import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';

export const useDigital = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const overallPermissions = getActivePermissionsSession();

  const [isRewardDetailsOpen, setIsRewardDetailsOpen] = useState({
    isOpen: false,
    rewardType: '',
  });
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
        type: LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
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

  const loyaltyDigitalRewardColumn = loyaltyDigitalRewardColumnDynamic?.(
    setIsRewardDetailsOpen,
    overallPermissions,
  );

  return {
    lazyGetAllLoyaltyDigitalRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyDigitalRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
  };
};
