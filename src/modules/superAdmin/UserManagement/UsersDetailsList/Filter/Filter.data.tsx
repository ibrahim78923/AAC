import { RHFSelect } from '@/components/ReactHookForm';
import { CommonAPIS } from '@/services/common-APIs';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  product: Yup.string().trim(),
  company: Yup.string().trim(),
  status: Yup.string().trim(),
});

export const defaultValues = {
  status: '',
  product: '',
  company: '',
};

export const dataArray = () => {
  const { useGetProductsQuery, useGetOrganizationsQuery }: any = CommonAPIS;
  const { data: products } = useGetProductsQuery();
  const { data: organizations } = useGetOrganizationsQuery();

  return [
    {
      title: 'Status',
      componentProps: {
        name: 'status',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'In Active' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      title: 'Product',
      componentProps: {
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
      title: 'Company',
      componentProps: {
        name: 'company',
        fullWidth: true,
        select: true,
      },
      options: organizations?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 12,
    },
  ];
};
