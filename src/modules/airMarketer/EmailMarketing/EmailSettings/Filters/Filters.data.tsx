import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  email: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  email: null,
};

export const dataArray = (apiQueryUsers: any) => {
  return [
    {
      id: 51,
      componentProps: {
        fullWidth: true,
        name: 'email',
        label: 'Email',
        placeholder: 'Select',
        getOptionLabel: (option: any) => `${option?.email}`,
        renderOption: (option: any) => `${option?.email}`,
        apiQuery: apiQueryUsers,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
