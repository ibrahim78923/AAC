import { RHFSelect } from '@/components/ReactHookForm';
import { useGetDealsListQuery } from '@/services/airSales/deals';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  dealName: Yup?.string()?.required('Deal Name is required'),
});

export const defaultValues = () => {
  return {
    dealName: '',
  };
};

export const FilterData = () => {
  const { data } = useGetDealsListQuery({});

  return [
    {
      componentProps: {
        name: 'dealName',
        label: 'Select Deal Name',
        fullWidth: true,
        select: true,
      },
      options: data?.data?.deals?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,

      md: 12,
    },
  ];
};
