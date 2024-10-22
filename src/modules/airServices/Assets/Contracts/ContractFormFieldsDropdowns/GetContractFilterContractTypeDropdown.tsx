import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContractTypeListQuery } from '@/services/airServices/assets/contracts';

const GetContractFilterContractTypeDropdown = () => {
  const apiContractType = useLazyGetContractTypeListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="type"
        label="Type"
        apiQuery={apiContractType}
        placeholder="Select Type"
        fullWidth
        size="small"
        externalParams={{ meta: false }}
      />
    </>
  );
};

export default GetContractFilterContractTypeDropdown;
