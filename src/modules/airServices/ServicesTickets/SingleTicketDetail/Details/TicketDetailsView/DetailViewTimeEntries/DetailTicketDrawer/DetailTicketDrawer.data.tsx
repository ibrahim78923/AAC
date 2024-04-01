import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import { ticketStatusOptions } from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  task: Yup?.mixed()?.nullable(),
  agent: Yup?.mixed()?.nullable()?.required('Field is Required'),
  hours: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable(),
  on: Yup?.date()?.required('Field is Required'),
  note: Yup?.mixed()?.nullable(),
});

export const addTimeDefaultValues = () => {
  return {
    task: null,
    agent: null,
    hours: '',
    status: null,
    on: new Date(),
    note: '',
  };
};
export const detailDrawerArray = (
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
      apiQuery: apiQueryTask,
      placeholder: 'Choose Task',
      externalParams: {
        limit: 50,
        meta: 'false',
        ticketId: ticketId,
      },
      getOptionLabel: (option: any) => `${option?.title}`,
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
      externalParams: { limit: 50, role: ROLES?.ORG_EMPLOYEE },
      getOptionLabel: (option: any) =>
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
      getOptionLabel: (option: any) => option?.label,
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
      select: true,
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
    },
    component: RHFEditor,
    md: 12,
  },
  ,
];
