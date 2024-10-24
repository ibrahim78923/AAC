import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useLazyGetUsersDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';

const GetContractAdminAgentDropdown = () => {
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};
  const apiQueryApprover =
    useLazyGetUsersDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="approver"
        label="Approver"
        placeholder="Select Approver"
        fullWidth
        size="small"
        apiQuery={apiQueryApprover}
        externalParams={{ productId, admin: true }}
        getOptionLabel={(option: any) =>
          `${option?.firstName} ${option?.lastName}`
        }
      />
    </>
  );
};

export default GetContractAdminAgentDropdown;
