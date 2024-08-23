import {
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import { getActiveProductSession } from '@/utils';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  users: Yup?.mixed()?.nullable(),
});

export const defaultValues = {
  users: null,
  createdDate: null,
};

export const dataArray = (apiQueryUsers: any) => {
  const ActiveProduct = getActiveProductSession();

  return [
    {
      id: 51,
      componentProps: {
        fullWidth: true,
        name: 'users',
        label: 'Users',
        placeholder: 'Select',
        externalParams: { product: ActiveProduct?._id, meta: false },
        getOptionLabel: (option: any) =>
          `${option?.userData?.firstName} ${option?.userData?.lastName} `,
        renderOption: (option: any) =>
          `${option?.userData?.firstName} ${option?.userData?.lastName}`,
        apiQuery: apiQueryUsers,
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        name: 'createdDate',
        label: 'Created Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
  ];
};
