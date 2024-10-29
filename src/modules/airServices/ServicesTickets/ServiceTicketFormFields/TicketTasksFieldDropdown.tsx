import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { useLazyGetSingleServicesTicketsTaskListDropDownQuery } from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';

export const TicketTasksFieldDropdown = (props: any) => {
  const { onBlurHandler, onChangeHandler } = props;
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const apiQueryTask = useLazyGetSingleServicesTicketsTaskListDropDownQuery();

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
      onBlurHandler={() => onBlurHandler?.()}
      onChangeHandler={(e: any, newValue: any) =>
        onChangeHandler?.(e, newValue)
      }
      getOptionLabel={(option: AutocompleteAsyncOptionsI) => option?.title}
    />
  );
};
