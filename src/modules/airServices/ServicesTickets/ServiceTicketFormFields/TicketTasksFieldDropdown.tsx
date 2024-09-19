import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { useLazyGetTaskByIdDropDownQuery } from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';

export const TicketTasksFieldDropdown = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const apiQueryTask = useLazyGetTaskByIdDropDownQuery();

  return (
    <RHFAutocompleteAsync
      name="task"
      label="Task"
      placeholder="Select Task"
      fullWidth
      size="small"
      required
      apiQuery={apiQueryTask}
      externalParams={{
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        meta: 'false',
        ticketId: ticketId,
      }}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) => option?.title}
    />
  );
};
