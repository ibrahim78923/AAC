import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertProductValidationSchema = Yup?.object()?.shape({
  productCatalog: Yup?.object()?.required('Required'),
  price: Yup?.number()
    ?.typeError('Price should be number')
    ?.required('Required'),
  years: Yup?.string()?.required('Required'),
  months: Yup?.string()?.required('Required'),
  quantity: Yup?.number()?.typeError('Quantity should be number'),
});

export const upsertProductDefaultValues = (data?: any) => {
  return {
    productCatalog: data?.vendorproductcatalogsDetails ?? null,
    price: data?.price ?? null,
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

export const upsertProductDataArray = (
  apiQueryProductCatalog: any,
  editData: any,
) => [
  {
    id: 9478,
    componentProps: {
      name: 'productCatalog',
      label: 'Product Catalog',
      type: 'text',
      size: 'small',
      required: true,
      disabled: editData?.length === 0 ? false : true,
      fullWidth: true,
      apiQuery: apiQueryProductCatalog,
      externalParams: { meta: false, limit: 50, page: 1 },
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
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
      type: 'number',
      size: 'small',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
