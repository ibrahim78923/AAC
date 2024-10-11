import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { useLazyFindServicesTicketByIdForMergeQuery } from '@/services/airServices/tickets';
import { truncateText } from '@/utils/avatarUtils';

export const TicketByIdFieldDropdown = () => {
  const apiQueryTicketById = useLazyFindServicesTicketByIdForMergeQuery();

  return (
    <RHFAutocompleteAsync
      name="searchTicketId"
      label="Search ticket"
      fullWidth
      required
      queryKey="ticketIdNumber"
      size="small"
      apiQuery={apiQueryTicketById}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.ticketIdNumber} ${' '} ${truncateText(option?.subject)}`
      }
    />
  );
};
