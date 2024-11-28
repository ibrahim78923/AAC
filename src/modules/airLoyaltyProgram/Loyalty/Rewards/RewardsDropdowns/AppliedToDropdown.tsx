import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetLoyaltyProgramLoyaltyTiersListDropdownQuery } from '@/services/airLoyaltyProgram/loyalty/rewards';

const AppliedToDropdown = () => {
  const getTiersDropdown =
    useLazyGetLoyaltyProgramLoyaltyTiersListDropdownQuery();
  return (
    <div>
      <RHFAutocompleteAsync
        name="appliedTo"
        label="Applied To"
        placeholder="Select Applied To"
        fullWidth
        size="small"
        required
        apiQuery={getTiersDropdown}
        externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
        getOptionLabel={(option: any) => option?.name}
      />
    </div>
  );
};

export default AppliedToDropdown;
