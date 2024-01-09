import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

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

export const upsertVendorValidationSchema: any = Yup?.object()?.shape({
  vendorCatalog: Yup?.mixed()?.nullable()?.required('Required'),
  price: Yup?.number()?.typeError('Enter Number')?.required('Required'),
  warrantyValidityYrs: Yup?.string(),
  warrantyValidityMonths: Yup?.string(),
  quantity: Yup?.number(),
});

export const upsertVendorDefaultValues = (data?: any) => {
  return {
    vendorCatalog: !!Object?.keys(data?.vendor ?? {})?.length
      ? data?.vendor
      : null,
    price: data?.price ?? 0,
    warrantyValidityYrs: data?.yrs ?? '',
    warrantyValidityMonths: data?.months ?? '',
    quantity: data?.quantity ?? 0,
  };
};

export const getUpsertVendorDataArray = (apiQueryVendorsList: any) => [
  {
    id: 1,
    componentProps: {
      name: 'vendorCatalog',
      label: 'Vendor Catalog',
      required: true,
      placeholder: '---Choose---',
      apiQuery: apiQueryVendorsList,
      externalParams: { meta: false, limit: 50 },
    },
    component: RHFAutocompleteAsync,
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
