import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';

import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketsTypeOptions,
} from '../ServicesTickets.data';
import { DATA_TYPES, ROLES } from '@/constants/strings';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { TicketsFilterDataDefaultValuesI } from './FilterTickets.interface';

export const sendIdOptions: string[] = [
  'ticketType',
  'department',
  'requester',
  'agent',
  'status',
  'category',
  'department',
];

export const neglectKeysInLoop: string[] = [
  'plannedEndDate',
  'plannedEndTime',
  'plannedStartDate',
  'plannedStartTime',
];

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
export const ticketsFilterFormFieldsDataFunction = (
  apiQueryRequester?: any,
  apiQueryAgent?: any,
  apiQueryCategory?: any,
  apiQueryDepartment?: any,
) => [
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
    componentProps: {
      fullWidth: true,
      name: 'agent',
      label: 'Agent',
      placeholder: 'Choose Agent',
      apiQuery: apiQueryAgent,
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_EMPLOYEE,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      placeholder: 'Choose Requester',
      apiQuery: apiQueryRequester,
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_REQUESTER,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    componentProps: {
      name: 'department',
      label: 'Department',
      fullWidth: true,
      apiQuery: apiQueryDepartment,
      placeholder: 'Choose Department',
    },
    component: RHFAutocompleteAsync,
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
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      placeholder: 'Choose Category',
      apiQuery: apiQueryCategory,
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 16,
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
    id: 10,
    componentProps: {
      fullWidth: true,
      name: 'plannedStartDate',
      label: 'Planned Start Date',
    },
    gridLength: 12,
    component: RHFDatePicker,
  },
  {
    id: 12,
    componentProps: {
      fullWidth: true,
      name: 'plannedEndDate',
      label: 'Planned End Date',
    },
    gridLength: 12,
    component: RHFDatePicker,
  },
];
