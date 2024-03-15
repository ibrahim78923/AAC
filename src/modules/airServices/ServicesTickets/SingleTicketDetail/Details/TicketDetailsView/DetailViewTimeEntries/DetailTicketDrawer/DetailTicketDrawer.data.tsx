import { SearchSharedIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ticketStatusOptions } from '@/modules/airServices/ServicesTickets/ServicesTickets.data';
import { InputAdornment } from '@mui/material';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  task: Yup?.mixed()?.nullable()?.required('Field is Required'),
  agent: Yup?.mixed()?.nullable()?.required('Field is Required'),
  hours: Yup?.mixed()?.nullable(),
  status: Yup?.mixed()?.nullable(),
  on: Yup?.date(),
  note: Yup?.mixed()?.nullable(),
});

export const addTimeDefaultValues = () => {
  return {
    task: '',
    agent: null,
    hours: new Date(),
    status: null,
    on: new Date(),
    note: '',
  };
};
export const detailDrawerArray = (apiQueryAgent: any) => [
  {
    id: 1,
    componentProps: {
      name: 'task',
      label: 'Task',
      fullWidth: true,
      select: false,
      placeholder: 'Search Here',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <SearchSharedIcon />
          </InputAdornment>
        ),
      },
    },

    component: RHFTextField,
    md: 12,
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
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'hours',
      label: 'Hours',
      fullWidth: true,
      select: true,
    },
    options: [
      {
        value: 'hr:mm',
        label: 'hr:mm',
      },
      {
        value: 'Pending',
        label: 'Pending',
      },
      {
        value: 'Resolved',
        label: 'Resolved',
      },
      {
        value: 'Closed',
        label: 'Closed',
      },
    ],
    component: RHFSelect,
    md: 12,
  },
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
