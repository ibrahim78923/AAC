import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { ROLES } from '@/constants/strings';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketTypeOptions,
} from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import dayjs from 'dayjs';
import * as Yup from 'yup';

const todayDate = dayjs()?.format(DATE_FORMAT?.UI);

export const editTicketDetailsValidationSchema = (form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    ticketType: Yup?.mixed()?.nullable(),
    category: Yup?.mixed()?.nullable(),
    status: Yup?.mixed()?.nullable()?.required('Status is Required'),
    priority: Yup?.mixed()?.nullable()?.required('Priority is Required'),
    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date()?.nullable(),
    plannedEndDate: Yup?.date()?.nullable(),
    plannedEffort: Yup?.string()?.trim(),
    ...formSchema,
  });
};

export const editTicketDetailsDefaultValuesDynamic = (
  data?: any,
  form?: any,
) => {
  const initialValues: any = dynamicFormInitialValue(data, form);

  return {
    category: data?.categoryDetails ?? null,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    priority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    department: data?.departmentDetails ?? null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    ticketType: data?.ticketType ?? null,
    agent: !!Object?.keys(data?.agentDetails ?? {})?.length
      ? data?.agentDetails
      : null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),

    plannedEndDate:
      typeof data?.plannedEndDate === 'string'
        ? new Date(data?.plannedEndDate)
        : null,

    plannedEffort: data?.plannedEffort ?? '',
    ...initialValues,
  };
};

export const editTicketDetailsFormFieldsDynamic = (
  apiQueryAgent: any,
  apiQueryCategory: any,
  apiQueryDepartment?: any,
) => [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 70,
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
    id: 3,
    componentProps: {
      name: 'source',
      label: 'Source',
      fullWidth: true,
      placeholder: 'Choose Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'ticketType',
      label: 'Type',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketTypeOptions,
    },

    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'impact',
      label: 'Impact',
      fullWidth: true,
      placeholder: 'Choose Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_EMPLOYEE,
      },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 7,
    componentProps: {
      name: 'category',
      label: 'Category',
      fullWidth: true,
      apiQuery: apiQueryCategory,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 8,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      disabled: true,
      ampm: false,
      textFieldProps: { readOnly: true },
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 9,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      textFieldProps: { readOnly: true },
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 10,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      placeholder: 'Eg: 1h10m',
    },
    component: RHFTextField,
  },
];
