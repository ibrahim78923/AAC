import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';

export const predefinedPurchaseOrderDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'orderName',
      label: 'Order Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'orderNumber',
      label: 'Order Number',
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'vendor',
      label: 'Vendor',
      placeholder: 'Select Vendor',
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'currency',
      label: 'Currency',
      placeholder: 'Select Currency',
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'department',
      label: 'Department',
      placeholder: 'Select Department',
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'expectedDeliveryDate',
      label: 'Expected delivery date',
      required: true,
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 7,
    componentProps: {
      name: 'location',
      label: 'Location',
      placeholder: 'Select Location',
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'termAndCondition',
      label: 'Terms and Conditions',
      multiline: true,
      minRows: 3,
      placeholder: 'Enter Description',
    },
    component: RHFTextField,
  },
];
