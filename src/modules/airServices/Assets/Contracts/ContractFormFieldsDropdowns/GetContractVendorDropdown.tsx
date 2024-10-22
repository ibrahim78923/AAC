import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetVendorDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';

const GetContractVendorDropdown = () => {
  const apiQueryVendor =
    useLazyGetVendorDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="vendor"
        label="Vendor"
        fullWidth
        size="small"
        placeholder="Select Vendor"
        apiQuery={apiQueryVendor}
        externalParams={{
          meta: false,
          limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        }}
      />
    </>
  );
};

export default GetContractVendorDropdown;
