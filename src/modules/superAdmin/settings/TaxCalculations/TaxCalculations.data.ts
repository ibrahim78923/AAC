import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const addTaxFormValidationSchema = Yup.object().shape({
  taxName: Yup.string().trim().required('Field is Required'),
  taxPercentage: Yup.string().trim().required('Field is Required'),
  taxDescription: Yup.string().trim().required('Field is Required'),
});

export const addTaxFormDefaultValues = {
  taxName: '',
  taxPercentage: '',
  taxDescription: '',
};

export const addTaxFormFiltersDataArray = [
  {
    componentProps: {
      name: 'taxName',
      label: 'Tax Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'taxPercentage',
      label: 'Tax Percentage',
    },
    component: RHFTextField,
    md: 12,
  },
  // {
  //     componentProps: {
  //         name: 'selectForms',
  //         label: 'Select Forms',
  //         select: true,
  //     },
  //     options: [
  //         { value: 'John Doe', option: 'John Doe' },
  //         { value: 'Andrew', option: 'Andrew' },
  //         { value: 'Richard robertson', option: 'Richard robertson' },
  //         { value: 'Franksten', option: 'Franksten' },
  //     ],
  //     component: RHFMultiCheckbox,
  //     md: 12,
  // },
  {
    componentProps: {
      name: 'taxDescription',
      label: 'Tax Description',
    },
    component: RHFEditor,
    md: 12,
  },
];

//Filters

export const taxFormFiltersValidationSchema = Yup.object().shape({
  taxName: Yup.string().trim().required('Field is Required'),
  taxPercentage: Yup.string().trim().required('Field is Required'),
  taxDescription: Yup.string().trim().required('Field is Required'),
});

export const taxFormFiltersDefaultValues = {
  taxName: '',
  taxPercentage: '',
  taxDescription: '',
};

export const taxFormFiltersFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'selectForm',
      label: 'Select Form',
      select: true,
    },
    options: [
      { value: 'Invoices', label: 'Invoices' },
      { value: 'Quotes', label: 'Quotes' },
      { value: 'Subscriptions', label: 'Subscriptions' },
      { value: 'Products', label: 'Products' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
