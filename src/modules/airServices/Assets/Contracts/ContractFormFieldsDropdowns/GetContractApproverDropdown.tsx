import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetUsersDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';

const GetContractApproverDropdown = () => {
  const apiQueryApprover =
    useLazyGetUsersDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="notifyTo"
        label="Notify To"
        placeholder="Select User"
        required
        size="small"
        fullWidth
        apiQuery={apiQueryApprover}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
      />
    </>
  );
};

export default GetContractApproverDropdown;
