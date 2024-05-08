import { PAGINATION } from '@/config';
import { LOYALTY_REWARDS_CLASS } from '@/constants/strings';
import { useLazyGetTiersListQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { useEffect, useState } from 'react';
import { tiersColumnsDynamic } from './Tiers.data';
import { getActivePermissionsSession } from '@/utils';

export const useTiers = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const overallPermissions = getActivePermissionsSession();

  const [lazyGetTiersListTrigger, lazyGetTiersListStatus]: any =
    useLazyGetTiersListQuery?.();

  const getTiersList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
        type: LOYALTY_REWARDS_CLASS?.TIERS,
      },
    };
    try {
      await lazyGetTiersListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getTiersList?.();
  }, [page, search, pageLimit]);

  const tiersColumns = tiersColumnsDynamic?.(
    setIsPortalOpen,
    overallPermissions,
  );

  return {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetTiersListStatus,
    tiersColumns,
    isPortalOpen,
    setIsPortalOpen,
  };
};
