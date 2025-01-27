import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { VendorCatalogDropdown } from './VendorCatalogDropdown';

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
  price: Yup?.number()
    ?.positive('Greater than 0')
    ?.typeError('Enter Number')
    ?.required('Required'),
  warrantyValidityYrs: Yup?.string(),
  warrantyValidityMonths: Yup?.string(),
  quantity: Yup?.number()
    ?.positive('Greater than 0')
    ?.min(0, 'Greater than or equal to 0'),
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

export const getUpsertVendorDataArray = () => [
  {
    _id: 1,
    component: VendorCatalogDropdown,
  },
  {
    _id: 2,
    componentProps: {
      name: 'price',
      label: 'Price (£)',
      type: 'number',
      required: true,
      inputProps: { min: 1 },
    },
    component: RHFTextField,
  },
  {
    _id: 3,
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
    _id: 4,
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
    _id: 5,
    componentProps: {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
    },
    component: RHFTextField,
  },
];
