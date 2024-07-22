import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { getActiveProductSession } from '@/utils';
export const defaultValues = {
  quoteStatus: '',
  createdBy: '',
};

export const dataArray = (productsAllUsers: any) => {
  const ActiveProduct: any = getActiveProductSession();
  return [
    {
      md: 12,
      component: RHFAutocomplete,
      componentProps: {
        name: 'status',
        label: 'Quote Status',
        placeholder: 'Select Quote Status',
        fullWidth: true,
        options: ['All', 'DRAFT', 'PUBLISHED'],
      },
    },
    {
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        fullWidth: true,
        placeholder: 'select option',
        apiQuery: productsAllUsers,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { productId: ActiveProduct?._id },
      },
    },
  ];
};
