import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContractTypeListQuery } from '@/services/airServices/assets/contracts';

const GetContractContractTypeDropdown = ({ contractId, name }: any) => {
  const apiContractType = useLazyGetContractTypeListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name={name}
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
