import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetVendorDropdownQuery } from '@/services/airServices/assets/contracts';

const GetSoftwareContractVendorDropdown: React.FC = () => {
  const apiQueryVendor = useLazyGetVendorDropdownQuery();
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
          meta: false,
          limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        }}
      />
    </>
  );
};

export default GetSoftwareContractVendorDropdown;
