import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const productsValidationSchema = Yup?.object()?.shape({
  productName: Yup?.string()?.trim()?.required('Field is Required'),
  unitPrice: Yup?.string()?.trim()?.required('Field is Required'),
});

export const productsDefaultValues = {
  productStatus: 'Custom Line Item',
  productName: '',
  sku: '',
  description: '',
  category: '',
  activeProducts: '',
  unitPrice: '',
  attachfile: '',
};

export const dealDataArray = [
  {
    id: 'name',
    componentProps: {
      name: 'name',
      label: 'Deal Name',
      fullWidth: true,
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
    },
    options: [
      { value: 'Inventory', label: 'Inventory' },
      { value: 'Non-Inventory', label: 'Non-Inventory' },
      { value: 'Service', label: 'Service' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    id: 'dealStageId',
    componentProps: {
      name: 'dealStageId',
      label: 'Deal Stage',
      select: true,
    },
    options: [
      { value: 'Inventory', label: 'Inventory' },
      { value: 'Non-Inventory', label: 'Non-Inventory' },
      { value: 'Service', label: 'Service' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    id: 'amount',
    componentProps: {
      name: 'amount',
      label: 'Amount',
      fullWidth: true,
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
    },
    component: RHFSelect,
    md: 12,
  },

  {
    id: 'priority',
    componentProps: {
      name: 'priority',
      label: 'Priority',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    id: 'addLineItemId',
    componentProps: {
      name: 'addLineItemId',
      label: 'Add Line Item',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
];
