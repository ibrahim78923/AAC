import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { ProductCatalogDropdown } from './ProductCatalogDropdown';

export const upsertProductValidationSchema = Yup?.object()?.shape({
  productCatalog: Yup?.object()?.required('Required'),
  price: Yup?.number()?.min(1)?.typeError('Enter Number')?.required('Required'),
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
    id: 9478,
    componentProps: {
      disabled: editData?.length === 0 ? false : true,
    },
    component: ProductCatalogDropdown,
  },
  {
    id: 2786,
    componentProps: {
      name: 'price',
      label: 'Price (£)',
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
      type: 'number',
      size: 'small',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
