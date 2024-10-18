import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
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
        externalParams={{ limit: 50 }}
        getOptionLabel={(option: any) => option?.name}
      />
    </>
  );
};

export default GetSoftwareContractSoftwareDropdown;
