import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContractTypeListQuery } from '@/services/airServices/assets/contracts';

const GetContractContractTypeDropdown = ({ contractId }: any) => {
  const apiContractType = useLazyGetContractTypeListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="type"
        label="Type"
        apiQuery={apiContractType}
        placeholder="Select Type"
        required
        fullWidth
        size="small"
        disabled={!!contractId}
        externalParams={{ meta: false }}
      />
    </>
  );
};

export default GetContractContractTypeDropdown;
