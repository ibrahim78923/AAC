import { useState } from 'react';
import { RULES_AND_TIERS_ACTION_CONSTANTS } from './RulesAndTiers.data';
import { useRouter } from 'next/router';

export const useRulesAndTiers = () => {
  const [hasRulesAndTiersAction, setHasRulesAndTiersAction] = useState(false);
  const router = useRouter();

  const rulesAndTiersActionComponent: any = {
    [RULES_AND_TIERS_ACTION_CONSTANTS?.UPSERT_RULES]: <></>,
  };
  const setRulesAndTiersAction = (rulesAndTierActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        rulesAndTierAction: rulesAndTierActionQuery,
      },
    });
    setTimeout(() => {
      setHasRulesAndTiersAction?.(true);
    }, 100);
  };

  return {
    hasRulesAndTiersAction,
    rulesAndTiersActionComponent,
    router,
    setRulesAndTiersAction,
  };
};
