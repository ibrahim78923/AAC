import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const mergeTicketsFormValidationSchema = Yup?.object()?.shape({
  ticketSelection: Yup?.string(),
  searchTicket: Yup?.string()?.nullable(),
});

export const mergeTicketsFormDefaultValue = {
  ticketSelection: 'Requester',
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
    component: RHFAutocomplete,
    componentProps: {
      name: 'ticketSelection',
      label: 'Find ticket by',
      fullWidth: true,
      options: ticketSelectionOptions,
    },
  },
  {
    id: 2,
    component: RHFAutocompleteAsync,
    componentProps: {
      name: 'searchTicket',
      label: 'Search Ticket',
      fullWidth: true,
      apiQuery: apiQuerySearch,
    },
  },
];
