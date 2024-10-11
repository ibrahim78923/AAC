import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import useAuth from '@/hooks/useAuth';
import { useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';

export const ApprovalsUsersFieldDropdown = () => {
  const apiQueryApprover =
    useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery();
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name="subject"
      label="To"
      placeholder="Search users"
      fullWidth
      required
      apiQuery={apiQueryApprover}
      size="small"
      externalParams={{
        requester: true,
        admin: true,
        productId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
    />
  );
};
