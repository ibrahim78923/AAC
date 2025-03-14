import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';
import { useLazyGetDropdownProductsQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';
import * as Yup from 'yup';

export const addRolesSchema = Yup.object().shape({
  organizationCompanyAccountId: Yup?.mixed()?.nullable(),
});

export const rolesFilterDefaultValues = (data: any) => {
  return {
    product: data?.product?.name ? data?.product : null,
    status: data?.status ?? null,
    startDate:
      typeof data?.startDate === 'object' ? new Date(data?.startDate) : null,
    endDate: typeof data?.endDate === 'object' ? new Date(data?.endDate) : null,
    organizationCompanyAccountId: null,
  };
};

export const rolesFiltersArray = (companyAccounts: any) => {
  const productsData = useLazyGetDropdownProductsQuery();
  const { user }: any = getSession();
  return [
    {
      componentProps: {
        placeholder: 'Select product',
        name: 'product',
        label: 'Product',
        apiQuery: productsData,
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
        label: 'Select Company Account',
        name: 'organizationCompanyAccountId',
        placeholder: 'Select company account',
        apiQuery: companyAccounts,
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: { orgId: user?.organization?._id, limit: 50 },
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    // commented for future use if needed
    // {
    //   componentProps: {
    //     label: 'Created Date',
    //     name: 'date',
    //     placeholder: 'Select date',
    //     fullWidth: true,
    //   },
    //   component: RHFSwitchableDatepicker,
    //   md: 12,
    // },
    // {
    //   componentProps: {
    //     label: 'Start Date',
    //     name: 'startDate',
    //     fullWidth: true,
    //   },
    //   component: RHFDatePicker,
    //   md: 12,
    // },
    // {
    //   componentProps: {
    //     label: 'End Date',
    //     name: 'endDate',
    //     fullWidth: true,
    //   },
    //   component: RHFDatePicker,
    //   md: 12,
    // },
  ];
};
