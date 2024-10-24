import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyProgramLoyaltyTiersListAsDropdownForLoyaltyRulesQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/rules';

export const useGetTiersListDropdown = () => {
  const apiQueryTiers =
    useLazyGetLoyaltyProgramLoyaltyTiersListAsDropdownForLoyaltyRulesQuery?.();

  return (
    <RHFAutocompleteAsync
      name="appliedTo"
      label="Applied to"
      placeholder="Select tiers"
      size="small"
      required={true}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
      }}
      apiQuery={apiQueryTiers}
    />
  );
};
