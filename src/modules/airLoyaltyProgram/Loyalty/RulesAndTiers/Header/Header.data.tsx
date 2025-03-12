import dynamic from 'next/dynamic';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../RulesAndTiers.constant';

const DeleteRules = dynamic(() => import('../Rules/DeleteRules'), {
  ssr: false,
});

const UpsertRules = dynamic(() => import('../Rules/UpsertRules'), {
  ssr: false,
});

const DeleteTiers = dynamic(() => import('../Tiers/DeleteTiers'), {
  ssr: false,
});

const UpsertTiers = dynamic(() => import('../Tiers/UpsertTiers'), {
  ssr: false,
});

export const loyaltyProgramRulesActionComponent = {
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.CREATE_RULES]: <UpsertRules />,
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.EDIT_RULES]: <UpsertRules />,
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.RULES_DETAILS]: <UpsertRules />,
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.DELETE_RULES]: <DeleteRules />,
};

export const loyaltyProgramTiersActionComponent = {
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.CREATE_TIERS]: <UpsertTiers />,
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.EDIT_TIERS]: <UpsertTiers />,
  [RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS?.DELETE_TIERS]: <DeleteTiers />,
};
