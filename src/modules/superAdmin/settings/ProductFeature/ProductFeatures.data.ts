import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const productFeaturesValidationSchema = Yup.object().shape({
  product: Yup.string().trim().required('Field is Required'),
  productFeatureName: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const productFeaturesDefaultValues = {
  product: '',
  productFeatureName: '',
  description: '',
};

export const productFeaturesFiltersDataArray = [
  {
    componentProps: {
      name: 'product',
      label: 'Product',
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'productFeatureName',
      label: 'Product Feature Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
