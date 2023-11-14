import { RHFSearchableSelect, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const mergeTicketsValidationSchema = Yup?.object()?.shape({
  department: Yup?.string(),
  agent: Yup?.string(),
});

export const mergeTicketsDefaultValue = (data?: any) => {
  return {
    ticketSelection: data?.ticketSelection ?? '',
    searchTicket: data?.searchTicket ?? '',
  };
};

export const mergeTicketsFormFields = [
  {
    id: 'ticketSelection',
    component: RHFSelect,
    componentProps: {
      name: 'ticketSelection',
      label: 'Select Department*',
      fullWidth: true,
      options: [
        { value: 'deal1', label: 'Deal Name 1' },
        { value: 'deal2', label: 'Deal Name 2' },
      ],
    },
  },
  {
    id: 'searchTicket',
    component: RHFSearchableSelect,
    componentProps: {
      name: 'searchTicket',
      label: 'search Ticket',
      fullWidth: true,
      options: [
        { value: 'deal1', label: 'Deal Name 1' },
        { value: 'deal2', label: 'Deal Name 2' },
      ],
    },
  },
];
