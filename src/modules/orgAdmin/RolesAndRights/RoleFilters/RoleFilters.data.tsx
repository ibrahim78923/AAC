import { RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
import { CommonAPIS } from '@/services/common-APIs';

export const rolesDefaultValues = {
  product: '',
  status: '',
  date: null,
};

export const rolesFiltersArray = () => {
  const { useGetProductsQuery } = CommonAPIS;
  const { data: products } = useGetProductsQuery({});

  return [
    {
      componentProps: {
        label: 'Product',
        name: 'product',
        fullWidth: true,
        select: true,
      },
      options: products?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),

      component: RHFSelect,
      md: 12,
    },

    {
      componentProps: {
        label: 'Status',
        name: 'status',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'Inactive' },
      ],
      component: RHFSelect,
      md: 12,
    },

    {
      componentProps: {
        label: 'Created Date',
        name: 'date',
        placeholder: 'Select',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
