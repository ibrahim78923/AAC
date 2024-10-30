import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDesktopDateTimePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { TICKET_TYPE_MAPPED } from '@/constants/api-mapped';
import { TICKET_TYPE } from '@/constants/strings';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
  ticketTypeOptionsDynamic,
} from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';
import { AgentFieldDropdown } from '../../../ServiceTicketFormFields/AgentFieldDropdown';
import { DepartmentFieldDropdown } from '../../../ServiceTicketFormFields/DepartmentFieldDropdown';
import { CategoryFieldDropdown } from '../../../ServiceTicketFormFields/CategoryFieldDropdown';
import { ServicesFieldDropdown } from '../../../ServiceTicketFormFields/ServicesFieldDropdown';
import { localeDateTime } from '@/lib/date-time';
import { formatDurationHourMinute } from '@/utils/dateTime';

const { SR } = TICKET_TYPE ?? {};

export const editTicketDetailsValidationSchema = (form?: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    ticketType: Yup?.mixed()?.nullable(),
    category: Yup?.mixed()?.nullable(),
    service: Yup?.mixed()
      ?.nullable()
      ?.when('ticketType', {
        is: (value: any) => value?._id === SR,
        then: () => Yup?.mixed()?.nullable()?.required('Service is required'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    numberOfItems: Yup?.number()
      ?.typeError('Not a number')
      ?.when(['ticketType', 'service'], {
        is: (ticketType: any, service: any) =>
          ticketType?._id === SR && !!service?.assetType,
        then: () =>
          Yup?.number()
            ?.positive('Greater than zero')
            ?.typeError('Not a number'),
        otherwise: () => Yup?.mixed()?.nullable(),
      }),
    status: Yup?.mixed()?.nullable()?.required('Status is required'),
    priority: Yup?.mixed()?.nullable()?.required('Priority is required'),
    department: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    plannedStartDate: Yup?.date()?.nullable(),
    plannedEndDate: Yup?.date()
      ?.nullable()
      ?.required('Planned end date is required'),
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
    numberOfItems: data?.numberOfItems ?? 0,
    status: data?.status ? { _id: data?.status, label: data?.status } : null,
    priority: data?.pirority
      ? { _id: data?.pirority, label: data?.pirority }
      : null,
    department: data?.departmentDetails ?? null,
    source: data?.source ? { _id: data?.source, label: data?.source } : null,
    impact: data?.impact ? { _id: data?.impact, label: data?.impact } : null,
    ticketType: data?.ticketType
      ? {
          _id: data?.ticketType,
          label: TICKET_TYPE_MAPPED?.[data?.ticketType] ?? data?.ticketType,
        }
      : null,
    agent: data?.agentDetails ?? null,
    plannedStartDate: !!data?.plannedStartDate
      ? localeDateTime(data?.plannedStartDate)
      : new Date(),
    plannedEndDate: !!data?.plannedEndDate
      ? localeDateTime(data?.plannedEndDate)
      : null,
    plannedEffort: data?.plannedEffort ?? '',
  };
};

export const editTicketDetailsFormFieldsDynamic = (
  watchForTicketType?: any,
  watch?: any,
  data?: any,
  getValues?: any,
  setValue?: any,
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
    id: 3,
    component: DepartmentFieldDropdown,
  },
  {
    id: 4,
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
    component: AgentFieldDropdown,
  },
  {
    id: 7,
    componentProps: {
      name: 'ticketType',
      label: 'Type',
      fullWidth: true,
      placeholder: 'Choose ticket type',
      options: ticketTypeOptionsDynamic?.(data?.ticketType),
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      disabled: data?.ticketType === SR,
    },
    component: CategoryFieldDropdown,
  },
  ...(watchForTicketType?._id === SR
    ? [
        {
          id: 9,
          componentProps: {
            categoryId: watch('category')?._id,
            disabled: data?.ticketType === SR,
          },
          component: ServicesFieldDropdown,
        },
      ]
    : []),
  ...(watchForTicketType?._id === SR && !!watch('service')?.assetType
    ? [
        {
          id: 10,
          componentProps: {
            name: 'numberOfItems',
            label: 'Number of items',
            placeholder: 'Enter number of items',
            fullWidth: true,
            required: true,
            type: 'number',
            disabled: data?.ticketType === SR,
            inputProps: { min: 0 },
          },
          component: RHFTextField,
        },
      ]
    : []),
  {
    id: 11,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Planned Start Date',
      fullWidth: true,
      disabled: true,
      textFieldProps: { readOnly: true },
    },
    component: RHFDatePicker,
  },
  {
    id: 12,
    componentProps: {
      name: 'plannedEndDate',
      label: 'Planned End Date',
      fullWidth: true,
      disablePast: true,
      required: true,
      textFieldProps: { readOnly: true },
      ampm: false,
    },
    component: RHFDesktopDateTimePicker,
  },
  {
    id: 13,
    componentProps: {
      name: 'plannedEffort',
      label: 'Planned Effort',
      fullWidth: true,
      placeholder: 'Eg: 1h10m',
      onBlurHandler: () => {
        const value = getValues('plannedEffort');
        setValue('plannedEffort', formatDurationHourMinute(value));
      },
    },
    component: RHFTextField,
  },
];
