import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';
import * as Yup from 'yup';

export const filterValidationSchema = Yup.object().shape({
  pipeline: Yup.string(),
});

export const filterDefaultValues = {
  pipeline: '',
};
export const forecastFilterArray = () => {
  const { data: dealPipelineData } = useGetDealPipeLineQuery({ meta: false });

  const data = dealPipelineData?.data?.map((item: any) => ({
    value: item?._id,
    label: item?.name,
  }));

  return [
    {
      componentProps: {
        name: 'pipeline',
        label: 'Pipeline',
        fullWidth: true,
        select: true,
      },
      options: data,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'CloseDate',
        label: 'Close date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
