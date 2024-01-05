import {
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { useGetUsersListQuery } from '@/services/airSales/deals';
import useDealTab from '../DealTab/useDealTab';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  dealPiplineId: Yup?.string()?.required('Field is Required'),
  dealOwnerId: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  dealPiplineId: 'Select',
  dealOwnerId: 'Select',
  dealStageId: 'Select',
};

export const CreateViewData = () => {
  const { pipelineData, DealsLifecycleStageData } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: 'ORG_EMPLOYEE' });

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
        name: 'dealPiplineId',
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
        defaultValue: 'Select',
      },
      options: DealsLifecycleStageData?.data?.lifecycleStages?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.name,
        }),
      ),
      component: RHFSelect,
    },
    {
      componentProps: {
        name: 'sharedWith',
        label: 'Shared With',
        required: true,
        row: false,
        options: [
          { label: 'Private', value: 'PRIVATE' },
          { label: 'My Teams (worked)', value: 'my teams' },
          { label: 'Everyone', value: 'everyone' },
        ],
      },
      component: RHFRadioGroup,
    },
  ];
};
