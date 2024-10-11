import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyFindServicesTicketByRequesterQuery } from '@/services/airServices/tickets';
import { truncateText } from '@/utils/avatarUtils';

export const TicketByRequesterFieldDropdown = () => {
  const apiQueryTicketByRequester = useLazyFindServicesTicketByRequesterQuery();

  return (
    <RHFAutocompleteAsync
      name="searchTicket"
      label="Search Ticket"
      placeholder="Search Ticket"
      size="small"
      fullWidth
      required
      multiple
      apiQuery={apiQueryTicketByRequester}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.ticketIdNumber} ${' '} ${truncateText(option?.subject)}`
      }
    />
  );
};
