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
  sharedWith: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  dealPiplineId: '',
  dealOwnerId: '',
  dealStageId: '',
  sharedWith: '',
};

export const CreateViewData = (dealPiplineId: string | null) => {
  const { pipelineData } = useDealTab();
  const { data: UserListData } = useGetUsersListQuery({ role: 'ORG_EMPLOYEE' });
  const filteredStages = pipelineData?.data?.dealpipelines?.find(
    (obj: { _id: string }) => obj?._id === dealPiplineId,
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
        required: true,
        row: false,
        options: [
          { label: 'Private', value: 'PRIVATE' },
          { label: 'My Teams (worked)', value: 'MYTEAMS' },
          { label: 'Everyone', value: 'EVERYONE' },
        ],
      },
      component: RHFRadioGroup,
    },
  ];
};
