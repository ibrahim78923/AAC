import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

// existing products
export const existingProductsValidationSchema = Yup.object().shape({
  searchProduct: Yup.string().required('Field is Required'),
});

export const customDefaultValues = {
  searchProduct: '',
};

export const customFields = [
  {
    componentProps: {
      name: 'searchProduct',
      label: 'Seach',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'inventory', label: 'Inventory' },
      { value: 'non_inventory', label: 'Non-Inventory' },
      { value: 'service', label: 'Service' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
