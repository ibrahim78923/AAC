import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { useLazyGetAllRequestersDropdownCustomerPortalTicketsQuery } from '@/services/airCustomerPortal/Tickets';

export const RequesterDropdown = (props: any) => {
  const apiQueryRequester =
    useLazyGetAllRequestersDropdownCustomerPortalTicketsQuery();
  return (
    <RHFAutocompleteAsync
      label="Requester"
      fullWidth
      required
      apiQuery={apiQueryRequester}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_REQUESTER,
      }}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Add Requester"
      {...props}
    />
  );
};
