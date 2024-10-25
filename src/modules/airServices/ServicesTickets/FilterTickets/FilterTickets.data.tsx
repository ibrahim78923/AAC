import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDesktopDateTimePicker,
} from '@/components/ReactHookForm';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketsTypeOptions,
} from '../ServicesTickets.data';
import { DATA_TYPES } from '@/constants/strings';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { TicketsFilterDataDefaultValuesI } from './FilterTickets.interface';
import { AgentFieldDropdown } from '../ServiceTicketFormFields/AgentFieldDropdown';
import { RequesterFieldDropdown } from '../ServiceTicketFormFields/RequesterFieldDropdown';
import { CategoryFieldDropdown } from '../ServiceTicketFormFields/CategoryFieldDropdown';
import { DepartmentFieldDropdown } from '../ServiceTicketFormFields/DepartmentFieldDropdown';

export const ticketsFilterFormFieldsDefaultValues = (
  data?: TicketsFilterDataDefaultValuesI,
) => {
  return {
    ticketType: data?.ticketType ?? null,
    createdOn:
      typeof data?.createdOn === DATA_TYPES?.OBJECT
        ? new Date(data?.createdOn)
        : null,
    status: data?.status ?? null,
    agent: data?.agent ?? null,
    requester: data?.requester ?? null,
    pirority: data?.pirority ?? null,
    impact: data?.impact ?? null,
    category: data?.category ?? null,
    department: data?.department ?? null,
    typeSource: data?.typeSource ?? null,
    plannedStartDate:
      typeof data?.plannedStartDate === DATA_TYPES?.OBJECT
        ? new Date(data?.plannedStartDate)
        : null,
    plannedEndDate:
      typeof data?.plannedEndDate === DATA_TYPES?.OBJECT
        ? new Date(data?.plannedEndDate)
        : null,
  };
};

export const ticketsFilterFormFieldsDataFunction = () => [
  {
    id: 1,
    componentProps: {
      fullWidth: true,
      name: 'ticketType',
      label: 'Ticket type',
      placeholder: 'All Tickets',
      options: ticketsTypeOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'createdOn',
      label: 'Created on',
    },
    component: RHFDatePicker,
  },
  {
    id: 3,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      placeholder: 'Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    component: AgentFieldDropdown,
  },
  {
    id: 5,
    componentProps: {
      hasEndIcon: false,
      required: false,
    },
    component: RequesterFieldDropdown,
  },
  {
    id: 6,
    component: DepartmentFieldDropdown,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'pirority',
      label: 'Priority',
      placeholder: 'Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      placeholder: 'Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 9,
    component: CategoryFieldDropdown,
  },
  {
    id: 10,
    componentProps: {
      fullWidth: true,
      name: 'typeSource',
      label: 'Source',
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 11,
    componentProps: {
      fullWidth: true,
      name: 'plannedStartDate',
      label: 'Planned Start Date',
    },
    component: RHFDatePicker,
  },
  {
    id: 12,
    componentProps: {
      fullWidth: true,
      name: 'plannedEndDate',
      label: 'Planned End Date',
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
];
