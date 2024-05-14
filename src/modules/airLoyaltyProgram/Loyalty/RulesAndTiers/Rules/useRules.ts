import { PAGINATION } from '@/config';
import {
  useChangeSingleRuleStatusMutation,
  useLazyGetRulesListQuery,
} from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';
import { useEffect, useState } from 'react';
import { rulesColumnsDynamic } from './Rules.data';
import { errorSnackbar } from '@/utils/api';
import { LOYALTY_RULE_STATUS } from '@/constants/strings';

export const useRules = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [lazyGetRulesListTrigger, lazyGetRulesListStatus]: any =
    useLazyGetRulesListQuery?.();

  const [changeSingleRuleStatusTrigger, changeSingleRuleStatusStatus]: any =
    useChangeSingleRuleStatusMutation?.();

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

  const changeStatus = async (e: any, id: any) => {
    const body = {
      status: e?.target?.checked
        ? LOYALTY_RULE_STATUS?.ACTIVE
        : LOYALTY_RULE_STATUS?.IN_ACTIVE,
    };

    const apiDataParameter = {
      pathParams: {
        id,
      },
      body,
    };

    try {
      await changeSingleRuleStatusTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const rulesColumns = rulesColumnsDynamic?.(changeStatus);

  return {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetRulesListStatus,
    rulesColumns,
    changeSingleRuleStatusStatus,
  };
};
