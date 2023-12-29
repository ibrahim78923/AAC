import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTimePicker,
} from '@/components/ReactHookForm';

import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketsTypeOptions,
} from '../ServicesTickets.data';

export const ticketsFilterFormFieldsDefaultValues = (data?: any) => {
  return {
    ticketType: data?.ticketType ?? null,
    createdOn:
      typeof data?.createdOn === 'object' ? new Date(data?.createdOn) : null,
    status: data?.status ?? null,
    agent: data?.agent ?? null,
    requester: data?.requester ?? null,
    department: data?.department ?? null,
    priority: data?.priority ?? null,
    impact: data?.impact ?? null,
    category: data?.category ?? null,
    source: data?.source ?? null,
    plannedStartDate:
      typeof data?.plannedStartDate === 'object'
        ? new Date(data?.plannedStartDate)
        : null,
    plannedStartTime:
      typeof data?.plannedStartTime === 'object'
        ? new Date(data?.plannedStartTime)
        : null,
    plannedEndDate:
      typeof data?.plannedEndDate === 'object'
        ? new Date(data?.plannedEndDate)
        : null,
    plannedEndTime:
      typeof data?.plannedEndTime === 'object'
        ? new Date(data?.plannedEndTime)
        : null,
    dueByDate:
      typeof data?.dueByDate === 'object' ? new Date(data?.dueByDate) : null,
    dueByTime:
      typeof data?.dueByTime === 'object' ? new Date(data?.dueByTime) : null,
  };
};
export const ticketsFilterFormFieldsDataFunction = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryAgent?: any,
  apiQueryCategory?: any,
) => [
  {
    id: 1,
    componentProps: {
      fullWidth: true,
      name: 'ticketType',
      label: 'Ticket type',
      placeholder: 'All Tickets',
      options: ticketsTypeOptions,
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
      externalParams: { limit: 50, role: 'ORG_AGENT' },
      getOptionLabel: (option: any) =>
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
      externalParams: { limit: 50, role: 'ORG_REQUESTER' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      placeholder: 'Choose Department',
      apiQuery: apiQueryDepartment,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'priority',
      label: 'Priority',
      placeholder: 'Priority',
      options: ticketPriorityOptions,
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
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 10,
    componentProps: {
      fullWidth: true,
      name: 'plannedStartDate',
      label: 'Planned Start Date',
    },
    gridLength: 7.5,
    component: RHFDatePicker,
  },
  {
    id: 11,
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    gridLength: 4.5,
    component: RHFTimePicker,
  },
  {
    id: 12,
    componentProps: {
      fullWidth: true,
      name: 'plannedEndDate',
      label: 'Planned End Date',
    },
    gridLength: 7.5,
    component: RHFDatePicker,
  },
  {
    id: 13,
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    gridLength: 4.5,
    component: RHFTimePicker,
  },
  {
    id: 14,
    componentProps: {
      fullWidth: true,
      name: 'dueByDate',
      label: 'Due By',
    },
    gridLength: 7.5,
    component: RHFDatePicker,
  },
  {
    id: 15,
    componentProps: {
      fullWidth: true,
      name: 'dueByTime',
      label: '\u00a0\u00a0',
    },
    gridLength: 4.5,
    component: RHFTimePicker,
  },
  {
    id: 16,
    componentProps: {
      fullWidth: true,
      name: 'typeSource',
      label: 'Source',
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
    },
    component: RHFAutocomplete,
  },
];
