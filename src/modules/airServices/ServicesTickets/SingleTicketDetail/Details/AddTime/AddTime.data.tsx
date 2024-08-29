import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { ticketStatusOptions } from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { pxToRem } from '@/utils/getFontValue';
import * as Yup from 'yup';

export const addTimeFormValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    task: Yup?.mixed()?.nullable()?.required('Task is Required'),
    agent: Yup?.mixed()?.nullable()?.required('Agent is Required'),
    hours: Yup?.string()?.trim()?.required('Hours is Required'),
    status: Yup?.mixed()?.nullable(),
    on: Yup?.date()?.required('On is Required'),
    note: Yup?.mixed()?.nullable(),
    ...formSchema,
  });
};

export const addTimeFormDefaultValues = (form?: any) => {
  const initialValues: any = dynamicFormInitialValue({}, form);

  return {
    task: null,
    agent: null,
    hours: '',
    status: null,
    on: new Date(),
    note: '',
    ...initialValues,
  };
};
export const addTimeFormFieldsDynamic = (
  apiQueryAgent: any,
  apiQueryTask: any,
  ticketId: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'task',
      label: 'Task',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryTask,
      placeholder: 'Choose Task',
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        meta: 'false',
        ticketId: ticketId,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) => `${option?.title}`,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      fullWidth: true,
      required: true,
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
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'hours',
      label: 'Hours',
      fullWidth: true,
      required: true,
      placeholder: 'Eg: 1h 10m',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      placeholder: 'Choose Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'on',
      label: 'On',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
    md: 12,
  },

  {
    id: 12,
    componentProps: {
      name: 'note',
      label: 'Note',
      fullWidth: true,
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
    md: 12,
  },
];
