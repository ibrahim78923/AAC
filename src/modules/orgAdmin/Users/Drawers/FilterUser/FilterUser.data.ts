import { RHFSelect } from '@/components/ReactHookForm';
import { CommonAPIS } from '@/services/common-APIs';

export const usersFilterArray = () => {
  const { useGetProductsQuery, useGetOrganizationsQuery }: any = CommonAPIS;
  const { data: products } = useGetProductsQuery();
  const { data: organizations } = useGetOrganizationsQuery();

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
        label: 'Company',
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
    {
      componentProps: {
        label: 'Status',
        name: 'status',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'InActive' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};
