import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
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
        externalParams={{ limit: 50 }}
        getOptionLabel={(option: any) => option?.name}
      />
    </>
  );
};

export default GetContractSoftwareDropdown;
