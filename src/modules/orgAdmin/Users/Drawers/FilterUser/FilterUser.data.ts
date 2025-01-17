import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { CommonAPIS } from '@/services/common-APIs';
import { getSession } from '@/utils';

export const usersFilterDefaultValues = (data: any) => {
  return {
    product: data?.product?.name ? data?.product : null,
    company: data?.company?.name ? data?.company : null,
    status: data?.status ?? null,
  };
};

export const usersFilterArray = () => {
  const {
    useLazyGetCompanyAccountsDropdownQuery,
    useLazyGetDropdownProductsQuery,
  }: any = CommonAPIS;
  const { user }: any = getSession();
  const products = useLazyGetDropdownProductsQuery();
  const organizations = useLazyGetCompanyAccountsDropdownQuery();
  const organizationId = user?.organization?._id;

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
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: {
          meta: false,
          orgId: organizationId,
        },
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
