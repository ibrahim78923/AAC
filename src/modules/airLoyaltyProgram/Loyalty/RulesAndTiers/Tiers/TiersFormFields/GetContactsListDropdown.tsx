import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyProgramLoyaltyContactListDropdownForTierQuery } from '@/services/airLoyaltyProgram/loyalty/rulesAndTiers/tiers';

export const GetContactsListDropdown = () => {
  const apiContactQuery =
    useLazyGetLoyaltyProgramLoyaltyContactListDropdownForTierQuery();
  return (
    <RHFAutocompleteAsync
      name="contacts"
      placeholder="select"
      apiQuery={apiContactQuery}
      externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
