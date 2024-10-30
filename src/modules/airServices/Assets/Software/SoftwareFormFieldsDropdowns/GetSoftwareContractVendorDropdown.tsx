import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetVendorDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';

const GetSoftwareContractVendorDropdown: React.FC = () => {
  const apiQueryVendor =
    useLazyGetVendorDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        fullWidth
        name="vendor"
        label="Vendor"
        size="small"
        placeholder="Select Vendor"
        apiQuery={apiQueryVendor}
        externalParams={{
          meta: true,
          limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        }}
      />
    </>
  );
};

export default GetSoftwareContractVendorDropdown;
