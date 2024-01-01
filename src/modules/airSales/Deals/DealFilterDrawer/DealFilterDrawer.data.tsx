import { RHFDatePicker, RHFTextField } from '@/components/ReactHookForm';
import useDealSaleSite from '../useDealSaleSite';
import {
  useGetDealsListQuery,
  useGetUsersListQuery,
} from '@/services/airSales/deals';

export const defaultValues = {
  dealPiplineId: '',
  name: '',
  dealOwnerId: '',
  dealStageId: '',
  closeDate: null,
};

export const FilterData = () => {
  const { pipelineData, DealsLifecycleStageData } = useDealSaleSite();
  const { data: UserListData } = useGetUsersListQuery({ role: 'ORG_EMPLOYEE' });

  const { data } = useGetDealsListQuery({});

  return [
    {
      componentProps: {
        name: 'dealPiplineId',
        label: 'Deal Pipeline',
        select: true,
        // defaultValues: 'Select',
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })) ?? [{ label: '', value: '' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        select: true,
        // defaultValues: 'Select',
      },
      options: data?.data?.deals?.map((item: any) => ({
        value: item?.name,
        label: item?.name,
      })) ?? [{ label: 'Select', value: '' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        select: true,
        // defaultValues: 'Select',
      },
      options: UserListData?.data?.users?.map((item: any) => {
        return {
          value: item?._id,
          label: `${item?.firstName} ${item?.lastName}`,
        };
      }) ?? [{ label: '', value: '' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'closeDate',
        label: 'Close Date',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        select: true,
        // defaultValues: 'Select',
      },
      options: DealsLifecycleStageData?.data?.lifecycleStages?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.name,
        }),
      ) ?? [{ label: '', value: '' }],
      component: RHFTextField,
    },
  ];
};
