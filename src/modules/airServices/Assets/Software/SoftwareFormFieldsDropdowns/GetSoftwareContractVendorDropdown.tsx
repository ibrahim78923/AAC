import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
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
        externalParams={{ meta: false, limit: 50 }}
      />
    </>
  );
};

export default GetSoftwareContractVendorDropdown;
