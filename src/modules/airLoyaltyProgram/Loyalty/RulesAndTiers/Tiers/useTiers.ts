import { PAGINATION } from '@/config';
import { LOYALTY_REWARDS_CLASS } from '@/constants/strings';
import { useLazyGetTiersListQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';
import { useEffect, useState } from 'react';
import { tiersColumnsDynamic } from './Tiers.data';

export const useTiers = (props: any) => {
  const { setRulesAndTiersAction } = props;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
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

  const tiersColumns = tiersColumnsDynamic?.(setRulesAndTiersAction);

  return {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetTiersListStatus,
    tiersColumns,
  };
};
