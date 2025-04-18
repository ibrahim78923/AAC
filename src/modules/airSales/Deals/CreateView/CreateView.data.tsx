import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import useDealTab from '../DealTab/useDealTab';
import { getActiveProductSession } from '@/utils';
import { useLazyGetAllUsersDropdownQuery } from '@/services/common-APIs';

export const validationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  sharedWith: '',
};

export const CreateViewData = (dealPipelineId: { _id: string }) => {
  const { pipelineListDropdown } = useDealTab();
  const ActiveProduct = getActiveProductSession();
  const ownerData = useLazyGetAllUsersDropdownQuery();

  const filteredStages: any = pipelineListDropdown
    ? pipelineListDropdown[1]?.data?.find(
        (pipeline: any) => pipeline?._id === dealPipelineId?._id,
      )?.stages
    : [];
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
        label: 'Deal Pipeline',
        placeholder: 'Select Pipeline',
        apiQuery: pipelineListDropdown,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
        clearIcon: false,
      },
      component: RHFAutocompleteAsync,
    },
    {
      title: 'Deal Owner',
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        placeholder: 'Select Owner',
        apiQuery: ownerData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { productId: ActiveProduct?._id },
      },
      component: RHFAutocompleteAsync,
    },
    {
      componentProps: {
        label: 'Start Date',
        name: 'dateStart',
        fullWidth: true,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      componentProps: {
        label: 'End Date',
        name: 'dateEnd',
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
        disabled: !dealPipelineId,
      },
      options: filteredStages?.map((item: any) => {
        return {
          value: item?._id,
          label: item?.name,
        };
      }),
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
          { label: 'My Teams', value: 'MY_TEAMS' },
          { label: 'Everyone', value: 'EVERYONE' },
        ],
      },
      component: RHFRadioGroup,
    },
  ];
};
