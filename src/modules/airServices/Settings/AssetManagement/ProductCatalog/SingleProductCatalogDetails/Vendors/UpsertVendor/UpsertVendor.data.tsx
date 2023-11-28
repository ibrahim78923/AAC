import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const vendorCatalogOptions = ['Dell', 'Freshworks', 'Logitech'];

const warrantyValidityYrsOptions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

const warrantyValidityMonthsOptions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
];

export const upsertVendorValidationSchema = Yup?.object()?.shape({
  vendorCatalog: Yup?.string()?.required('Field is Required'),
  price: Yup?.string()?.required('Field is Required'),
  warrantyValidityYrs: Yup?.string(),
  warrantyValidityMonths: Yup?.string(),
  quantity: Yup?.string()?.trim(),
});

export const upsertVendorDefaultValues = {
  vendorCatalog: '',
  price: '',
  warrantyValidityYrs: '',
  warrantyValidityMonths: '',
  quantity: '',
};

export const upsertVendorDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'vendorCatalog',
      label: 'Vendor Catalog',
      required: true,
      options: vendorCatalogOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'price',
      label: 'Price (£)',
      type: 'number',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'warrantyValidityYrs',
      label: 'Warranty/Validity',
      placeholder: 'Yrs',
      options: warrantyValidityYrsOptions,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'warrantyValidityMonths',
      label: '\u00a0\u00a0',
      placeholder: 'Months',
      options: warrantyValidityMonthsOptions,
    },
    component: RHFAutocomplete,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: 'quantity',
      label: 'Quantity',
    },
    component: RHFTextField,
  },
];
