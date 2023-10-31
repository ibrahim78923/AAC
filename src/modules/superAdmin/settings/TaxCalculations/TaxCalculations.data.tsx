import {
  RHFCheckbox,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';

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

  {
    componentProps: {
      name: 'Invoices',
      label: 'Invoices',
    },
    component: RHFCheckbox,
    md: 6,
  },
  {
    componentProps: {
      name: 'subscription',
      label: 'Subscription',
    },
    component: RHFCheckbox,
    md: 6,
  },
  {
    componentProps: {
      name: 'qoutes',
      label: 'Quotes',
    },
    component: RHFCheckbox,
    md: 6,
  },
  {
    componentProps: {
      name: 'products',
      label: 'Products',
    },
    component: RHFCheckbox,
    md: 6,
  },
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

export const columns: any = [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.taxName,
    id: 'taxName',
    cell: (info: any) => info.getValue(),
    header: 'Tax Name',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.taxPercentage,
    id: 'taxPercentage',
    isSortable: true,
    header: 'tax Percentage',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.createDate,
    id: 'createDate',
    isSortable: true,
    header: 'Create Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.activeModule,
    id: 'activeModule',
    isSortable: true,
    header: 'Active Module',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
