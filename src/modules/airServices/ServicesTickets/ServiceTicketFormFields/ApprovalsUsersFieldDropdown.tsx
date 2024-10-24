import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery } from '@/services/airServices/tickets';
import { getActiveProductSession } from '@/utils';
import { useMemo } from 'react';

export const ApprovalsUsersFieldDropdown = () => {
  const apiQueryApprover =
    useLazyGetAllUsersAsRequestersDropdownForServicesTicketsQuery();

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

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
