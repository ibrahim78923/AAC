import { RHFAutocompleteAsync, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const mergeTicketsFormValidationSchema = Yup?.object()?.shape({
  ticketSelection: Yup?.string(),
  searchTicket: Yup?.string()?.nullable(),
});

export const mergeTicketsFormDefaultValue = {
  ticketSelection: 'requester',
  searchTicket: null,
};

const ticketSelectionOptions = [
  { value: 'requester', label: 'Requester' },
  { value: 'subject', label: 'Subject' },
  { value: 'id', label: 'ID' },
];
export const mergeTicketsFormFieldsDynamic = (apiQuerySearch: any) => [
  {
    id: 1,
    component: RHFSelect,
    componentProps: {
      name: 'ticketSelection',
      label: 'Select Ticket',
      fullWidth: true,
      select: true,
      options: ticketSelectionOptions,
    },
  },
  {
    id: 2,
    component: RHFAutocompleteAsync,
    componentProps: {
      name: 'searchTicket',
      label: 'search Ticket',
      fullWidth: true,
      apiQuery: apiQuerySearch,
    },
  },
];
