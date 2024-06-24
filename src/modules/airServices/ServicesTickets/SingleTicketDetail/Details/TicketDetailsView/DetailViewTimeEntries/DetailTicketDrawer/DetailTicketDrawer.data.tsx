import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { ROLES } from '@/constants/strings';
import { ticketStatusOptions } from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  task: Yup?.mixed()?.nullable()?.required('Task is Required'),
  agent: Yup?.mixed()?.nullable()?.required('Agent is Required'),
  hours: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable(),
  on: Yup?.date()?.required('On is Required'),
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
      required: true,
      apiQuery: apiQueryTask,
      placeholder: 'Choose Task',
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
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
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_EMPLOYEE,
      },
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
      style: { height: '200px' },
    },
    component: RHFEditor,
    md: 12,
  },
  ,
];
