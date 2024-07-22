import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedTimeEntriesDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'task',
      label: 'Task',
      placeholder: 'Choose Task',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'agent',
      label: 'Agent',
      placeholder: 'Choose Agent',
      required: true,
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'hours',
      label: 'Hours',
      placeholder: 'Eg: 1h 10m',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'status',
      label: 'Status',
      placeholder: 'Choose Status',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'on',
      label: 'On',
      fullWidth: true,
      required: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 6,
    componentProps: {
      name: 'note',
      label: 'Note',
      style: { height: '200px' },
    },
    component: RHFEditor,
  },
];
