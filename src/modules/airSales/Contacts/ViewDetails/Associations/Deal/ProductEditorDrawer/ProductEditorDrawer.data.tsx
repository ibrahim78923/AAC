import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const productsValidationSchema = Yup.object().shape({
  productName: Yup.string().trim().required('Field is Required'),
  unitPrice: Yup.string().trim().required('Field is Required'),
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

export const productsDataArray = [
  {
    componentProps: {
      name: 'DealName',
      label: 'Deal Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'DealPipeLine',
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
    componentProps: {
      name: 'DealStage',
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
    componentProps: {
      name: 'Amount',
      label: 'Amount',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
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
      name: 'Deal Owner',
      label: 'Deal Owner',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'Priority',
      label: 'Priority',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'AddLineItem',
      label: 'Add Line Item',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add products',
  Edit: 'Edit products',
  View: 'View products',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
