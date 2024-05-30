import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const dealValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  dealPipelineId: Yup?.mixed()?.required('Field is Required'),
  dealStageId: Yup?.mixed()?.required('Field is Required'),
  amount: Yup?.string()?.trim()?.nullable(),
  closeDate: Yup?.mixed()?.nullable(),
  ownerId: Yup?.mixed()?.nullable(),
  priority: Yup?.string()?.trim()?.nullable(),
  addLineItemId: Yup?.string()?.trim()?.nullable(),
});

export const dealDefaultValues = {
  name: '',
  dealPipelineId: null,
  dealStageId: null,
  amount: null,
  closeDate: null,
  ownerId: null,
  priority: '',
  addLineItemId: '',
};

export const dealDataArray = (
  orgId: string,
  dealPipelineData: any,
  dealStagesData: any,
  dealOwnersData: any,
  addLineItemsData: any,
  disabled: boolean,
) => {
  return [
    {
      id: 'name',
      componentProps: {
        name: 'name',
        label: 'Deal Name',
        fullWidth: true,
        disabled: disabled,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      id: 'dealPipelineId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'dealPipelineId',
        label: 'Deal PipeLine',
        placeholder: 'Select Deal PipeLine',
        apiQuery: dealPipelineData,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { meta: false },
        required: true,
        disabled: disabled,
      },
    },
    {
      id: 'dealStageId',
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        select: true,
        disabled: dealStagesData?.length === 0 || disabled,
        required: true,
      },
      options: dealStagesData,
      component: RHFSelect,
      md: 12,
    },
    {
      id: 'amount',
      componentProps: {
        name: 'amount',
        label: 'Amount',
        fullWidth: true,
        disabled: disabled,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      id: 'closeDate',
      componentProps: {
        name: 'closeDate',
        label: 'Close Date',
        fullWidth: true,
        disabled: disabled,
      },
      component: RHFDatePicker,
      md: 12,
    },
    {
      id: 'ownerId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'ownerId',
        label: 'Deal Owner',
        placeholder: 'Select Deal Owner',
        apiQuery: dealOwnersData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
        disabled: disabled,
      },
    },
    {
      id: 'priority',
      componentProps: {
        name: 'priority',
        label: 'Priority',
        fullWidth: true,
        select: true,
        disabled: disabled,
      },
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      id: 'addLineItemId',
      componentProps: {
        name: 'addLineItemId',
        label: 'Add Line Item',
        fullWidth: true,
        select: true,
        disabled: disabled,
      },
      options: addLineItemsData,
      component: RHFSelect,
      md: 12,
    },
  ];
};

export const existingDealValidationSchema = Yup?.object()?.shape({
  dealId: Yup?.mixed()?.nullable()?.required('Field is Required'),
});

export const existingDealDefaultValues = {
  dealId: {} || null,
};

export const existingDealDataArray = (dealsList: any) => [
  {
    id: 'dealId',
    component: RHFAutocompleteAsync,
    md: 12,
    componentProps: {
      name: 'dealId',
      label: 'Select Deal',
      placeholder: 'Select Deal',
      apiQuery: dealsList,
      getOptionLabel: (option: any) => option?.name,
      externalParams: {},
      required: true,
    },
  },
];
