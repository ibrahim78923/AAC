import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
} from '@/components/ReactHookForm';
import { useLazyGetDropdownProductsQuery } from '@/services/common-APIs';

export const rolesFilterDefaultValues = (data: any) => {
  return {
    product: data?.product?.name ? data?.product : null,
    status: data?.status ?? null,
    startDate:
      typeof data?.startDate === 'object' ? new Date(data?.startDate) : null,
    endDate: typeof data?.endDate === 'object' ? new Date(data?.endDate) : null,
  };
};

export const rolesFiltersArray = () => {
  const productsData = useLazyGetDropdownProductsQuery();
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
    {
      componentProps: {
        label: 'Start Date',
        name: 'startDate',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        label: 'End Date',
        name: 'endDate',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
  ];
};
