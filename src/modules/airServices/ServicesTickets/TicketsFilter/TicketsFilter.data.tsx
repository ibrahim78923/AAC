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

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

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
    plannedStartTime: null,
    plannedEndDate:
      typeof data?.plannedEndDate === 'object'
        ? new Date(data?.plannedEndDate)
        : null,
    plannedEndTime: null,
  };
};
export const ticketsFilterFormFieldsDataFunction = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryCategory?: any,
  apiQueryAgent?: any,
) => [
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'ticketType',
      label: 'Ticket Type',
      placeholder: 'All Tickets',
      options: ticketsTypeOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'createdOn',
      label: 'Created On',
    },
    component: RHFDatePicker,
  },
  {
    id: 150,
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
    id: 200,
    componentProps: {
      fullWidth: true,
      name: 'agents',
      label: 'Agents',
      placeholder: 'Choose Agent',
      apiQuery: apiQueryAgent,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 129,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      placeholder: 'Choose Requester',
      apiQuery: apiQueryRequester,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 129,
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
    id: 100,
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
    id: 82,
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
    id: 96,
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      placeholder: 'Choose Category',
      apiQuery: apiQueryCategory,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 97,
    componentProps: {
      fullWidth: true,
      name: 'plannedStartDate',
      label: 'Planned Start Date',
    },
    gridLength: 7.5,
    component: RHFDatePicker,
  },
  {
    id: 985,
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
    },
    gridLength: 4.5,
    component: RHFTimePicker,
  },
  {
    id: 974,
    componentProps: {
      fullWidth: true,
      name: 'plannedEndDate',
      label: 'Planned End Date',
    },
    gridLength: 7.5,
    component: RHFDatePicker,
  },
  {
    id: 958,
    componentProps: {
      name: 'plannedEndTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    gridLength: 4.5,
    component: RHFTimePicker,
  },
  {
    id: 9657,
    componentProps: {
      fullWidth: true,
      name: 'dueByDate',
      label: 'Due By',
    },
    gridLength: 7.5,
    component: RHFDatePicker,
  },
  {
    id: 98676,
    componentProps: {
      fullWidth: true,
      name: 'dueByTime',
      label: '\u00a0\u00a0',
    },
    gridLength: 4.5,
    component: RHFTimePicker,
  },
  {
    id: 96215,
    componentProps: {
      fullWidth: true,
      name: 'typeSource',
      label: 'Type Source',
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
    },
    component: RHFAutocomplete,
  },
];
