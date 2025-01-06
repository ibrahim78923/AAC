import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyFindServicesTicketBySubjectQuery } from '@/services/airServices/tickets';
import { truncateText } from '@/utils/avatarUtils';

export const TicketBySubjectFieldDropdown = () => {
  const apiQueryTicketBySubject = useLazyFindServicesTicketBySubjectQuery();

  return (
    <RHFAutocompleteAsync
      name="searchTicket"
      label="Search Ticket"
      placeholder="Search Ticket"
      size="small"
      fullWidth
      required
      multiple
      queryKey="search"
      apiQuery={apiQueryTicketBySubject}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.ticketIdNumber} ${' '} ${truncateText(option?.subject)}`
      }
    />
  );
};
