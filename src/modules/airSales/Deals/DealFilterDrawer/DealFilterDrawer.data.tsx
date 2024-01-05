import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import {
  useGetDealsListQuery,
  useGetUsersListQuery,
} from '@/services/airSales/deals';
import useDealTab from '../DealTab/useDealTab';

export const defaultValues = {
  dealPiplineId: '',
  name: '',
  dealOwnerId: '',
  dealStageId: '',
  date: null,
};

export const FilterData = () => {
  const { DealsLifecycleStageData, pipelineData } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: 'ORG_EMPLOYEE' });

  const { data } = useGetDealsListQuery({});

  return [
    {
      componentProps: {
        label: 'Deal Pipeline',
        name: 'dealPiplineId',
        fullWidth: true,
        select: true,
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),

      component: RHFSelect,
      md: 12,
    },

    {
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        select: true,
      },
      options: data?.data?.deals?.map((item: any) => ({
        value: item?.name,
        label: item?.name,
      })),
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        select: true,
      },
      options: UserListData?.data?.users?.map((item: any) => {
        return {
          value: item?._id,
          label: `${item?.firstName} ${item?.lastName}`,
        };
      }),
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'date',
        label: 'Close Date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
    {
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        select: true,
      },
      options: DealsLifecycleStageData?.data?.lifecycleStages?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.name,
        }),
      ),
      component: RHFSelect,
    },
  ];
};
