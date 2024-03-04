import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const productsValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  dealPiplineId: Yup?.string()?.trim()?.required('Field is Required'),
  dealStageId: Yup?.string()?.trim()?.required('Field is Required'),
  amount: Yup?.string()?.trim()?.required('Field is Required'),
});

export const productsDefaultValues = {
  name: '',
  dealPiplineId: '',
  dealStageId: '',
  amount: '',
  closeDate: null,
  ownerId: '',
  priority: '',
  addLineItemId: '',
};

export const dealDataArray = (
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
      },
      component: RHFTextField,
      md: 12,
    },

    {
      id: 'dealPiplineId',
      componentProps: {
        name: 'dealPiplineId',
        label: 'Deal PipeLine',
        fullWidth: true,
        select: true,
        disabled: disabled,
      },
      options: dealPipelineData,
      component: RHFSelect,
      md: 12,
    },
    {
      id: 'dealStageId',
      componentProps: {
        name: 'dealStageId',
        label: 'Deal Stage',
        select: true,
        disabled: disabled,
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
      componentProps: {
        name: 'ownerId',
        label: 'Deal Owner',
        fullWidth: true,
        select: true,
        disabled: disabled,
      },
      options: dealOwnersData,
      component: RHFSelect,
      md: 12,
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
