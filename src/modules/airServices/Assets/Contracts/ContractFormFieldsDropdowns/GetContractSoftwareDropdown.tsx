import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { useLazyGetSoftwareDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';

const GetContractSoftwareDropdown = () => {
  const apiQuerySoftware =
    useLazyGetSoftwareDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="software"
        label="Software"
        required
        size="small"
        fullWidth
        placeholder="Select Software"
        apiQuery={apiQuerySoftware}
        externalParams={{ limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT }}
        getOptionLabel={(option: any) => option?.name}
      />
    </>
  );
};

export default GetContractSoftwareDropdown;
