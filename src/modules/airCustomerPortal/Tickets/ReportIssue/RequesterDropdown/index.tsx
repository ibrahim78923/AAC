import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ROLE } from '@/constants/strings';
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
      externalParams={{ limit: 500, role: ROLE?.ORG_REQUESTER }}
      getOptionLabel={(option: any) =>
        `${option?.firstName} ${option?.lastName}`
      }
      placeholder="Add Requester"
      {...props}
    />
  );
};
