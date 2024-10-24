import { DeleteRules } from '../Rules/DeleteRules';
import { UpsertRules } from '../Rules/UpsertRules';
import { RULES_AND_TIERS_PORTAL_ACTION_CONSTANTS } from '../RulesAndTiers.constant';
import { DeleteTiers } from '../Tiers/DeleteTiers';
import { UpsertTiers } from '../Tiers/UpsertTiers';

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
