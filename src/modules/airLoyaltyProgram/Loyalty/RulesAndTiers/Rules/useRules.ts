import { PAGINATION } from '@/config';
import { useLazyGetRulesListQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import { useEffect, useState } from 'react';
import { rulesColumnsDynamic } from './Rules.data';

export const useRules = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [lazyGetRulesListTrigger, lazyGetRulesListStatus]: any =
    useLazyGetRulesListQuery?.();

  const getRulesList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetRulesListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getRulesList?.();
  }, [page, search, pageLimit]);

  const rulesColumns = rulesColumnsDynamic?.();

  return {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetRulesListStatus,
    rulesColumns,
  };
};
