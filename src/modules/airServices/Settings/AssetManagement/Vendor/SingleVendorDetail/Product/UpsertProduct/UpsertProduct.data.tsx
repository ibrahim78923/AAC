import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { ProductCatalogDropdown } from './ProductCatalogDropdown';

export const upsertProductValidationSchema = Yup?.object()?.shape({
  productCatalog: Yup?.object()?.required('Product catalog is required'),
  price: Yup?.number()
    ?.min(1)
    ?.typeError('Enter Number')
    ?.required('Price is required'),
  years: Yup?.string(),
  months: Yup?.string(),
  quantity: Yup?.number()?.typeError('Enter Number'),
});

export const upsertProductDefaultValues = (data?: any) => {
  return {
    productCatalog: !!Object?.keys(data?.vendorproductcatalogsDetails ?? {})
      ?.length
      ? data?.vendorproductcatalogsDetails
      : null,
    price: data?.price ?? 0,
    years: data?.yrs ?? '',
    months: data?.months ?? '',
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

export const upsertProductDataArray = (editData: any) => [
  {
    _id: 1,
    componentProps: {
      disabled: editData?.length === 0 ? false : true,
    },
    component: ProductCatalogDropdown,
    md: 12,
  },
  {
    _id: 2,
    componentProps: {
      name: 'price',
      label: 'Price (£)',
      type: 'number',
      size: 'small',
      fullWidth: true,
      required: true,
      inputProps: { min: 1 },
    },
    component: RHFTextField,
    md: 12,
  },
  {
    _id: 3,
    md: 6,
    componentProps: {
      name: 'years',
      label: 'Warranty/Validity',
      size: 'small',
      placeholder: 'Yrs',
      options: warrantyValidityYrsOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 4,
    md: 6,
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
    _id: 5,
    md: 12,
    componentProps: {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      size: 'small',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
