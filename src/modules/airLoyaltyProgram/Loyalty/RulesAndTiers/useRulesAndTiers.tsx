import { useEffect, useState } from 'react';
import { RULES_AND_TIERS_ACTION_CONSTANTS } from './RulesAndTiers.data';
import { UpsertRules } from './Rules/UpsertRules';
import { useRouter } from 'next/router';
import { UpsertTier } from './Tiers/UpsertTier';
import usePath from '@/hooks/usePath';

export const useRulesAndTiers = () => {
  const [hasRulesAndTiersAction, setHasRulesAndTiersAction] = useState(false);
  const router = useRouter();
  const { makePath } = usePath();

  useEffect(() => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['rulesAndTierAction'],
      }),
    );
  }, []);

  const rulesAndTiersActionComponent: any = {
    [RULES_AND_TIERS_ACTION_CONSTANTS?.UPSERT_RULES]: (
      <UpsertRules
        isDrawerOpen={hasRulesAndTiersAction}
        setIsDrawerOpen={setHasRulesAndTiersAction}
      />
    ),
    [RULES_AND_TIERS_ACTION_CONSTANTS?.UPSERT_TIERS]: (
      <UpsertTier
        isDrawerOpen={hasRulesAndTiersAction}
        setIsDrawerOpen={setHasRulesAndTiersAction}
      />
    ),
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
