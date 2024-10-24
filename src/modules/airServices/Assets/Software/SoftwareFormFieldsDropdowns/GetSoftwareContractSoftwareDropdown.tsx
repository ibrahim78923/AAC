import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetSoftwareDropdownQuery } from '@/services/airServices/assets/contracts';

const GetSoftwareContractSoftwareDropdown: React.FC = () => {
  const apiQuerySoftware = useLazyGetSoftwareDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        fullWidth
        name="software"
        label="Software"
        size="small"
        required
        disabled
        apiQuery={apiQuerySoftware}
        externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
        getOptionLabel={(option: any) => option?.name}
      />
    </>
  );
};

export default GetSoftwareContractSoftwareDropdown;
