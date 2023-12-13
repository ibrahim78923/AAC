import { RHFAutocomplete } from '@/components/ReactHookForm';

const actionsOptions = ['BE 1', 'BE 2', 'BE 3', 'BE 4'];

export const actionsExecutedFields = [
  {
    _id: 456,
    gridLength: 3,
    componentProps: {
      name: 'action1',
      placeholder: 'Select Action',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 565,
    gridLength: 3,
    componentProps: {
      name: 'action2',
      placeholder: 'Select',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 456,
    gridLength: 3,
    componentProps: {
      name: 'action3',
      placeholder: 'Select',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 255,
    gridLength: 3,
    componentProps: {
      name: 'action4',
      placeholder: 'Select',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
];
