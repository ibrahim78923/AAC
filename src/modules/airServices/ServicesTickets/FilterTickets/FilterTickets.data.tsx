import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  // RHFTimePicker,
} from '@/components/ReactHookForm';

import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketsTypeOptions,
} from '../ServicesTickets.data';
import { ROLES } from '@/constants/strings';

export const sendIdOptions = [
  'ticketType',
  'department',
  'requester',
  'agent',
  'status',
  'category',
  'department',
];
export const neglectKeysInLoop = [
  'plannedEndDate',
  'plannedEndTime',
  'plannedStartDate',
  'plannedStartTime',
];

export const ticketsFilterFormFieldsDefaultValues = (data?: any) => {
  return {
    ticketType: data?.ticketType ?? null,
    createdOn:
      typeof data?.createdOn === 'object' ? new Date(data?.createdOn) : null,
    status: data?.status ?? null,
    agent: data?.agent ?? null,
    requester: data?.requester ?? null,
    priority: data?.priority ?? null,
    impact: data?.impact ?? null,
    category: data?.category ?? null,
    department: data?.department ?? null,
    typeSource: data?.typeSource ?? null,
    plannedStartDate:
      typeof data?.plannedStartDate === 'object'
        ? new Date(data?.plannedStartDate)
        : null,
    // plannedStartTime:
    //   typeof data?.plannedStartTime === 'object'
    //     ? new Date(data?.plannedStartTime)
    //     : null,
    plannedEndDate:
      typeof data?.plannedEndDate === 'object'
        ? new Date(data?.plannedEndDate)
        : null,
    // plannedEndTime:
    //   typeof data?.plannedEndTime === 'object'
    //     ? new Date(data?.plannedEndTime)
    //     : null,
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
      getOptionLabel: (option: any) => option?.label,
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
      getOptionLabel: (option: any) => option?.label,
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
      externalParams: { limit: 50, role: ROLES?.ORG_AGENT },
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
      externalParams: { limit: 50, role: ROLES?.ORG_REQUESTER },
      getOptionLabel: (option: any) =>
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
      name: 'priority',
      label: 'Priority',
      placeholder: 'Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: any) => option?.label,
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
      getOptionLabel: (option: any) => option?.label,
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
    id: 16,
    componentProps: {
      fullWidth: true,
      name: 'typeSource',
      label: 'Source',
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: any) => option?.label,
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
  // {
  //   id: 11,
  //   componentProps: {
  //     name: 'plannedStartTime',
  //     label: '\u00a0\u00a0',
  //     fullWidth: true,
  //   },
  //   gridLength: 4.5,
  //   component: RHFTimePicker,
  // },
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
  // {
  //   id: 13,
  //   componentProps: {
  //     name: 'plannedEndTime',
  //     label: '\u00a0\u00a0',
  //     fullWidth: true,
  //   },
  //   gridLength: 4.5,
  //   component: RHFTimePicker,
  // },
];
