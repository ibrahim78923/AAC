import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ticketStatusOptions } from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import { pxToRem } from '@/utils/getFontValue';
import * as Yup from 'yup';
import { AgentFieldDropdown } from '../../../ServiceTicketFormFields/AgentFieldDropdown';
import { TicketTasksFieldDropdown } from '../../../ServiceTicketFormFields/TicketTasksFieldDropdown';

export const addTimeFormValidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
    task: Yup?.mixed()?.nullable()?.required('Task is required'),
    agent: Yup?.mixed()?.nullable()?.required('Agent is required'),
    hours: Yup?.string()?.trim()?.required('Hours is required'),
    status: Yup?.mixed()?.nullable(),
    on: Yup?.date()?.required('On is required'),
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

export const addTimeFormFieldsDynamic = () => [
  {
    id: 1,
    component: TicketTasksFieldDropdown,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      required: true,
    },
    component: AgentFieldDropdown,
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
