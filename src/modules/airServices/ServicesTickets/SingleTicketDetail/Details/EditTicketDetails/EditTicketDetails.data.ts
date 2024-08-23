import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDesktopDateTimePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { ROLES, TICKET_TYPE } from '@/constants/strings';
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
    service: Yup?.mixed()
      ?.nullable()
      ?.when('ticketType', {
        is: (value: any) => value?._id === TICKET_TYPE?.SR,
        then: () => Yup?.mixed()?.nullable()?.required('Service is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
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
    ...initialValues,
    category: data?.categoryDetails ?? null,
    service: data?.serviceDetails ?? null,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    priority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    department: data?.departmentDetails ?? null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    ticketType: data?.ticketType
      ? { _id: data?.ticketType, label: data?.ticketType }
      : null,
    agent: !!Object?.keys(data?.agentDetails ?? {})?.length
      ? data?.agentDetails
      : null,
    plannedStartDate: new Date(data?.plannedStartDate ?? todayDate),

    plannedEndDate:
      typeof data?.plannedEndDate === 'string'
        ? new Date(data?.plannedEndDate)
        : null,

    plannedEffort: data?.plannedEffort ?? '',
  };
};

export const editTicketDetailsFormFieldsDynamic = (
  apiQueryAgent: any,
  apiQueryCategory: any,
  apiQueryDepartment?: any,
  watchForTicketType?: any,
  apiQueryServicesCategory?: any,
  getValues?: any,
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
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'ticketType',
      label: 'Type',
      fullWidth: true,
      placeholder: 'Choose ticket type',
      options: ticketTypeOptions,
      disabled: watchForTicketType?._id === TICKET_TYPE?.EQ,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
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
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
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
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
  ...(watchForTicketType?._id === TICKET_TYPE?.SR
    ? [
        {
          id: 7,
          componentProps: {
            name: 'service',
            label: 'Service',
            fullWidth: true,
            required: watchForTicketType?._id === TICKET_TYPE?.SR,
            apiQuery: apiQueryServicesCategory,
            placeholder: 'Choose Service',
            externalParams: { categoryId: getValues('category')?._id },
            getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
              option?.itemName,
          },
          component: RHFAutocompleteAsync,
        },
      ]
    : []),
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
