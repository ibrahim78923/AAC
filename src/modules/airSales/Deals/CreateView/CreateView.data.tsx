import {
  RHFDatePicker,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';

import useDealSaleSite from '../useDealSaleSite';
import * as Yup from 'yup';

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
  const { pipelineData, DealsLifecycleStageData, DealsUserListData } =
    useDealSaleSite();
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
        defaultValue: 'Select',
      },
      options: pipelineData?.data?.dealpipelines?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })) ?? [{ label: 'Select', value: 'Select' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        select: true,
        defaultValue: 'Select',
      },
      options: DealsUserListData?.data?.useros?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })) ?? [{ label: 'Select', value: 'Select' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'CloseDate',
        label: 'Close Date',
      },
      component: RHFDatePicker,
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
      ) ?? [{ label: 'Select', value: 'Select' }],
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'sharedWith',
        label: 'Shared With',
        required: true,
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
