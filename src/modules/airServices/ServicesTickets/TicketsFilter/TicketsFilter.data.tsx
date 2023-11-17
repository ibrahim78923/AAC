import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
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

export const ticketsFilterFormFieldsDataFunction = (
  apiQueryRequester?: any,
  apiQueryDepartment?: any,
  apiQueryCategory?: any,
  apiQueryAgent?: any,
) => [
  {
    id: 2,
    component: RHFAutocomplete,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'ticketType',
      label: 'Ticket Type',
      options: ticketsTypeOptions,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'createdOn',
      label: 'Created On',
      select: true,
      options: dropdownDummy,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
      options: ticketStatusOptions,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 200,
    component: RHFAutocompleteAsync,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'agents',
      label: 'Agents',
      apiQuery: apiQueryAgent,
    },
  },
  {
    id: 129,
    componentProps: {
      name: 'requester',
      label: 'Requester',
      fullWidth: true,
      apiQuery: apiQueryRequester,
    },
    component: RHFAutocompleteAsync,
    gridLength: 12,
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'department',
      label: 'Department',
      apiQuery: apiQueryDepartment,
    },
    gridLength: 12,
    component: RHFAutocompleteAsync,
  },
  {
    id: 100,
    componentProps: {
      fullWidth: true,
      name: 'pirority',
      label: 'Priority',
      select: true,
      options: ticketPriorityOptions,
    },
    gridLength: 12,
    component: RHFSelect,
  },
  {
    id: 82,
    component: RHFSelect,
    gridLength: 12,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      select: true,
      options: ticketImpactOptions,
    },
  },
  {
    id: 96,
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      options: dropdownDummy,
      apiQuery: apiQueryCategory,
    },
    gridLength: 12,
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
      select: true,
      options: ticketSourceOptions,
    },
    gridLength: 12,
    component: RHFSelect,
  },
];
