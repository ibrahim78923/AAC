import { RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import RHFSelect from '@/components/ReactHookForm/RHFSelect';
import { CommonAPIS } from '@/services/common-APIs';
import * as Yup from 'yup';

export const rolesValidationSchema = Yup.object().shape({
  product: Yup.string(),
  status: Yup.string(),
  createdDate: Yup.date(),
});

export const rolesDefaultValues = {
  product: '',
  status: '',
  createdDate: new Date(),
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
        name: 'dateStart',
        placeholder: 'Select',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
