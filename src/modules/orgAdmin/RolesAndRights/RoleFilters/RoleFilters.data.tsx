import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';
import { useLazyGetProductsListQuery } from '@/services/common-APIs';

export const rolesFilterDefaultValues = (data: any) => {
  return {
    product: data?.product?.name ? data?.product : null,
    status: data?.status ?? null,
  };
};

export const rolesFiltersArray = () => {
  const getProductsList = useLazyGetProductsListQuery({});
  return [
    {
      componentProps: {
        placeholder: 'Select product',
        name: 'product',
        label: 'Product',
        apiQuery: getProductsList,
        getOptionLabel: (option: any) => `${option?.name}`,
        externalParams: { status: 'ACTIVE' },
        queryKey: 'status',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        placeholder: 'Select status',
        name: 'status',
        label: 'Status',
        options: ['ACTIVE', 'INACTIVE'],
      },

      component: RHFAutocomplete,
      md: 12,
    },
    {
      componentProps: {
        label: 'Created Date',
        name: 'date',
        placeholder: 'Select date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
