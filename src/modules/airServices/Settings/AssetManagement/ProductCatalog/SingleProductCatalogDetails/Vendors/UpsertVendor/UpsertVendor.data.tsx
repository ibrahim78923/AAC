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
  vendorCatalog: Yup?.string()?.required('Required'),
  price: Yup?.number()?.typeError('Number')?.required('Required'),
  warrantyValidityYrs: Yup?.string(),
  warrantyValidityMonths: Yup?.string(),
  quantity: Yup?.number(),
});

export const upsertVendorDefaultValues = {
  vendorCatalog: '',
  price: 0,
  warrantyValidityYrs: '',
  warrantyValidityMonths: '',
  quantity: 0,
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
      type: 'number',
    },
    component: RHFTextField,
  },
];
