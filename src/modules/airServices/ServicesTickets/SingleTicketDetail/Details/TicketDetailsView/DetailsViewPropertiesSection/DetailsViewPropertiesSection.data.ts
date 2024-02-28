import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketTypeOptions,
} from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import dayjs from 'dayjs';
import * as Yup from 'yup';
const todayDate = dayjs()?.format(DATE_FORMAT?.UI);
export const validationSchema = Yup?.object()?.shape({
  ticketType: Yup?.mixed()?.nullable(),
  category: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable()?.required('Required'),
  priority: Yup?.mixed()?.nullable()?.required('Required'),
  source: Yup?.mixed()?.nullable(),
  impact: Yup?.mixed()?.nullable(),
  agent: Yup?.mixed()?.nullable(),
  plannedStartDate: Yup?.date(),
  plannedEndDate: Yup?.date()?.nullable(),
  plannedEffort: Yup?.string()?.trim(),
});
export const ticketsDetailsDefaultValuesFunction = (data?: any) => {
  return {
    category: data?.categoryDetails ?? null,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    priority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    ticketType: data?.ticketType ?? null,
    agent: !!Object?.keys(data?.agentDetails ?? {})?.length
      ? data?.agentDetails
      : null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),

    plannedEndDate:
      typeof data?.plannedStartDate === 'string'
        ? new Date(data?.plannedEndDate)
        : null,

    plannedEffort: data?.plannedEffort ?? '',
  };
};
export const dataArray = (apiQueryAgent: any, apiQueryCategory: any) => [
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 4,
  },
  {
    id: 6,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
      required: true,
      placeholder: 'Choose Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 4,
  },

  {
    id: 8,
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 4,
  },
  {
    componentProps: {
      name: 'ticketType',
      label: 'Type',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketTypeOptions,
    },

    component: RHFAutocomplete,
    md: 4,
  },
  {
    id: 9,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
    md: 4,
  },
  {
    id: 10,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: { limit: 50, role: 'ORG_AGENT' },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
    md: 4,
  },
  {
    id: 4,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
    md: 4,
  },

  {
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      select: true,
    },

    component: RHFDatePicker,
    md: 4,
  },

  {
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      select: true,
    },

    component: RHFDatePicker,
    md: 4,
  },

  {
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      placeholder: 'Eg: 1h 10m',
    },
    component: RHFTextField,
    md: 4,
  },
];
