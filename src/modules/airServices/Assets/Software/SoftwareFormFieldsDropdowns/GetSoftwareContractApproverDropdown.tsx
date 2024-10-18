import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAgentsDropdownQuery } from '@/services/airServices/assets/contracts';

const GetSoftwareContractApproverDropdown: React.FC = () => {
  const apiQueryApprover = useLazyGetAgentsDropdownQuery();
  return (
    <>
      <RHFAutocompleteAsync
        fullWidth
        name="notifyTo"
        label="Notify To"
        placeholder="Select User"
        required
        size="small"
        apiQuery={apiQueryApprover}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
      />
    </>
  );
};

export default GetSoftwareContractApproverDropdown;
