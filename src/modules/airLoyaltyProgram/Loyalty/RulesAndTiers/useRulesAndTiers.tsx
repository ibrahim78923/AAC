import { useState } from 'react';
import { RULES_AND_TIERS_ACTION_CONSTANTS } from './RulesAndTiers.data';
import { UpsertRules } from './Rules/UpsertRules';
import { useRouter } from 'next/router';
import { UpsertTier } from './Tiers/UpsertTier';
import { SingleTierDetail } from './Tiers/SingleTierDetail';

export const useRulesAndTiers = () => {
  const [hasRulesAndTiersAction, setHasRulesAndTiersAction] = useState<any>({});
  const router = useRouter();

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
    [RULES_AND_TIERS_ACTION_CONSTANTS?.TIER_DETAILS]: (
      <SingleTierDetail
        isDrawerOpen={hasRulesAndTiersAction}
        setIsDrawerOpen={setHasRulesAndTiersAction}
      />
    ),
  };

  const setRulesAndTiersAction = (rulesAndTierActionQuery: any) => {
    setHasRulesAndTiersAction?.({
      isOpen: true,
      type: rulesAndTierActionQuery,
    });
  };

  return {
    hasRulesAndTiersAction,
    rulesAndTiersActionComponent,
    router,
    setRulesAndTiersAction,
  };
};
