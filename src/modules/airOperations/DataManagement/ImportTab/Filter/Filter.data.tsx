import {
  // RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
} from '@/components/ReactHookForm';

export const productOptions = [
  {
    label: 'sales',
    value: 'sales',
  },
  {
    label: 'services',
    value: 'services',
  },
  {
    label: 'marketing',
    value: 'marketing',
  },
];

export const objectOptions = [
  {
    label: 'deals',
    value: 'deals',
  },
  {
    label: 'task',
    value: 'task',
  },
  {
    label: 'quotes',
    value: 'quotes',
  },
];

export const defaultValues = {
  product: '',
  user: '',
  object: '',
  createdDate: new Date(),
};

export const filterFieldsFunction = () =>
  // apiQuerySearch?: any
  [
    {
      id: 2,
      component: RHFSelect,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'product',
        label: 'product',
        select: true,
        options: productOptions,
      },
    },
    //TODO: Below commented code will be used with integration
    // {
    //   id: 920,
    //   componentProps: {
    //     name: 'user',
    //     label: 'user',
    //     fullWidth: true,
    //     apiQuery: apiQuerySearch,
    //   },
    //   gridLength: 12,
    //   component: RHFAutocompleteAsync,
    // },
    {
      id: 920,
      componentProps: {
        fullWidth: true,
        name: 'object',
        label: 'object',
        select: true,
        options: objectOptions,
      },
      gridLength: 12,
      component: RHFSelect,
    },
    {
      id: 150,
      componentProps: {
        fullWidth: true,
        name: 'createdDate',
        label: 'created Date',
      },
      gridLength: 12,
      component: RHFDatePicker,
    },
  ];
