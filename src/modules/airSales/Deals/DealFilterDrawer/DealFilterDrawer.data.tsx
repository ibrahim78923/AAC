import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import {
  useGetDealsListQuery,
  useGetUsersListQuery,
} from '@/services/airSales/deals';
import useDealTab from '../DealTab/useDealTab';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';

export const defaultValues = {
  dealPipelineId: '',
  name: '',
  dealOwnerId: '',
  dealStageId: '',
  date: null,
};

export const FilterData = (dealPipelineId: any) => {
  const { pipelineData } = useDealTab();
  const { user } = getSession();
  const organizationId: any = user?.organization?._id;
  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });

  const filteredStages =
    pipelineData?.data?.dealpipelines?.find(
      (pipeline: any) => pipeline?._id === dealPipelineId,
    )?.stages || [];

  const { data } = useGetDealsListQuery({});

  return [
    {
      componentProps: {
        label: 'Deal Pipeline',
        name: 'dealPipelineId',
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
        name: 'ownerId',
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
      options: filteredStages?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
    },
  ];
};
