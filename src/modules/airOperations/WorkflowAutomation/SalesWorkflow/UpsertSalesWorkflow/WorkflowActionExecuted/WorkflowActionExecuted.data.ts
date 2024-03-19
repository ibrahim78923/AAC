import { RHFAutocomplete } from '@/components/ReactHookForm';

const actionsOptions = ['BE 1', 'BE 2', 'BE 3', 'BE 4'];

export const actionsExecutedFields = (index: any) => [
  {
    _id: 456,
    gridLength: 6,
    componentProps: {
      name: `actions.${index}.key`,
      placeholder: 'Select',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 565,
    gridLength: 6,
    componentProps: {
      name: `actions.${index}.value`,
      placeholder: 'Select',
      options: actionsOptions,
    },
    component: RHFAutocomplete,
  },
];
