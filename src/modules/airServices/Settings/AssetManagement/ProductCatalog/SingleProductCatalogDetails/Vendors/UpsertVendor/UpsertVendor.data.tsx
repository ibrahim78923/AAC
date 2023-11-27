import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

const vendorCatalogOptions = ['Dell', 'Freshworks', 'Logitech'];

export const upsertVendorValidationSchema = Yup?.object()?.shape({
  vendorCatalog: Yup?.string()?.required('Field is Required'),
  price: Yup?.string()?.trim()?.required('Field is Required'),
  warrantyValidity: Yup?.date()?.required('Field is Required'),
  quantity: Yup?.string()?.trim()?.required('Field is Required'),
});

export const upsertVendorDefaultValues = {
  vendorCatalog: '',
  price: '',
  warrantyValidity: new Date(),
  quantity: '',
};

export const upsertVendorDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'vendorCatalog',
      label: 'Vendor Catalog',
      required: true,
      fullWidth: true,
      options: vendorCatalogOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'price',
      label: 'Price (£)',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'warrantyValidity',
      label: 'Warranty/Validity',
      required: true,
      fullWidth: true,
    },
    component: RHFDatePicker,
  },
  {
    id: 4,
    componentProps: {
      name: 'quantity',
      label: 'Quantity',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
