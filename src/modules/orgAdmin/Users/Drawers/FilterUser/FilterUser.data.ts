import { RHFSelect } from '@/components/ReactHookForm';
import { CommonAPIS } from '@/services/common-APIs';
import * as Yup from 'yup';

export const userFilterValSchema = Yup.object().shape({
  product: Yup.string(),
  company: Yup.string(),
  users: Yup.string(),
});

export const defaultValues = {
  product: '',
  company: '',
  users: '',
};

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
        label: 'Users',
        name: 'users',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'lesilie', label: 'Lesilie Alexander' },
        { value: 'jermon', label: 'jerome Bell' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};
