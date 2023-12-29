import {
  RHFAutocomplete,
  // RHFAutocompleteAsync,
  RHFDatePicker,
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
  product: null,
  user: null,
  object: null,
  createdDate: new Date(),
};

export const filterFieldsFunction = () =>
  // apiQuerySearch?: any
  [
    {
      id: 2,
      component: RHFAutocomplete,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'product',
        label: 'Product',
        select: true,
        placeholder: 'Product',
        options: productOptions,
      },
    },
    //TODO: Below commented code will be used with integration
    {
      id: 920,
      componentProps: {
        name: 'user',
        label: 'User',
        fullWidth: true,
        placeholder: 'User',
        // apiQuery: apiQuerySearch,
        options: [],
      },
      gridLength: 12,
      component: RHFAutocomplete,
      // component: RHFAutocompleteAsync,
    },
    {
      id: 920,
      componentProps: {
        fullWidth: true,
        name: 'object',
        label: 'Object',
        select: true,
        options: objectOptions,
        placeholder: 'Object',
      },
      gridLength: 12,
      component: RHFAutocomplete,
    },
    {
      id: 150,
      componentProps: {
        fullWidth: true,
        name: 'createdDate',
        label: 'Created Date',
      },
      gridLength: 12,
      component: RHFDatePicker,
    },
  ];
