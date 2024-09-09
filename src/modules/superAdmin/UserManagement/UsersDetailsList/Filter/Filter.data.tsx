import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import {
  useLazyGetProductsListQuery,
  useLazyGetSearchOrganizationsListQuery,
} from '@/services/common-APIs';

export const usersFilterDefaultValues = (data: any) => {
  return {
    product: data?.product?.name ? data?.product : null,
    company: data?.company?.name ? data?.company : null,
    status: data?.status ?? null,
  };
};

export const dataArray = () => {
  const products = useLazyGetProductsListQuery();
  const organizations = useLazyGetSearchOrganizationsListQuery();

  return [
    {
      componentProps: {
        label: 'Product',
        name: 'product',
        fullWidth: true,
        placeholder: 'Select product',
        apiQuery: products,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        label: 'Company',
        name: 'company',
        fullWidth: true,
        placeholder: 'Select company',
        apiQuery: organizations,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        label: 'Status',
        name: 'status',
        fullWidth: true,
        placeholder: 'Select status',
        options: ['Active', 'Inactive'],
      },
      component: RHFAutocomplete,
      md: 12,
    },
  ];
};
