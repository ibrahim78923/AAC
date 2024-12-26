import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContractDropdownListQuery } from '@/services/airServices/assets/software/single-software-detail/users';

const GetSoftwareContractDropdown: React.FC = () => {
  const contractDropdown = useLazyGetContractDropdownListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="contract"
        label="Contract"
        placeholder="Select Contract"
        fullWidth
        required
        size="small"
        apiQuery={contractDropdown}
        getOptionLabel={(option: any) => option?.name}
      />
    </>
  );
};

export default GetSoftwareContractDropdown;
