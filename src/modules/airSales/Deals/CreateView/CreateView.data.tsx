import {
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { useGetUsersListQuery } from '@/services/airSales/deals';
import useDealTab from '../DealTab/useDealTab';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  sharedWith: '',
};

export const CreateViewData = (dealPipelineId: string | null) => {
  const { pipelineData } = useDealTab();
  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;
  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });
  const filteredStages = pipelineData?.data?.dealpipelines?.find(
    (obj: { _id: string }) => obj?._id === dealPipelineId,
  )?.stages;

  return [
    {
      componentProps: {
        name: 'name',
        label: 'Name',
        select: false,
        required: true,
        placeholder: 'Enter Name',
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'dealPipelineId',
        label: 'Deal Pipline',
        select: true,
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
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
      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })),
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'CloseDate',
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
      },
      options: filteredStages?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'sharedWith',
        label: 'Shared With',
        defaultValue: 'EVERYONE',
        row: false,
        options: [
          { label: 'Private', value: 'PRIVATE' },
          { label: 'My Teams (worked)', value: 'MY_TEAMS' },
          { label: 'Everyone', value: 'EVERYONE' },
        ],
      },
      component: RHFRadioGroup,
    },
  ];
};
