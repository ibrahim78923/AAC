import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetContractTypeListQuery } from '@/services/airServices/assets/contracts';

const GetContractFilterContractTypeDropdown = (props: any) => {
  const { name = 'type ', label = 'Type' } = props;
  const apiContractType = useLazyGetContractTypeListQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name={name}
        label={label}
        apiQuery={apiContractType}
        placeholder="Select contract type"
        fullWidth
        size="small"
        externalParams={{ meta: false }}
      />
    </>
  );
};

export default GetContractFilterContractTypeDropdown;
