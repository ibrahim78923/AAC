import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertProductValidationSchema = Yup?.object()?.shape({
  productCatalog: Yup?.string(),
  price: Yup?.number()
    ?.typeError('Price should be number')
    ?.required('Required'),
  years: Yup?.string()?.required('Required'),
  months: Yup?.string()?.required('Required'),
  quantity: Yup?.number(),
});

export const upsertProductDefaultValues = (data?: any) => {
  return {
    productCatalog: data?.productName ?? '',
    price: data?.price ?? null,
    years: data?.warrantyValidity?.month ?? '',
    months: data?.warrantyValidity?.year ?? '',
    quantity: data?.quantity ?? 0,
  };
};

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

const productCatalogOptions = [
  'Dell 22-inch Monitor',
  'Logitech M705 Wireless Mouse',
];

export const upsertProductDataArray = [
  {
    id: 9478,
    componentProps: {
      name: 'productCatalog',
      label: 'Product Catalog',
      type: 'text',
      size: 'small',
      placeholder: 'Catalog',
      fullWidth: true,
      options: productCatalogOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2786,
    componentProps: {
      name: 'price',
      label: 'Price',
      type: 'number',
      size: 'small',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3456,
    gridLength: 6,
    componentProps: {
      name: 'years',
      label: 'Warranty/Validity',
      size: 'small',
      placeholder: 'Yrs',
      required: true,
      options: warrantyValidityYrsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 4435,
    gridLength: 6,
    componentProps: {
      name: 'months',
      label: '\u00a0\u00a0',
      size: 'small',
      placeholder: 'Months',
      options: warrantyValidityMonthsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 5654,
    componentProps: {
      name: 'quantity',
      label: 'Quantity',
      type: 'text',
      size: 'small',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
