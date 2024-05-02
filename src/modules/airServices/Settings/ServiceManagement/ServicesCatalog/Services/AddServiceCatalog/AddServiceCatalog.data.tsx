import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addServiceCatalogValidationSchema = Yup?.object()?.shape({
  categoryName: Yup?.string()?.trim()?.required('Category Name is Required'),
  description: Yup?.string()?.trim()?.required('Description is Required'),
});

export const addServiceCatalogDefaultValues = {
  categoryName: '',
  description: '',
};

export const addServiceCatalogData = [
  {
    id: 5,
    componentProps: {
      name: 'categoryName',
      label: 'Category Name',
      placeholder: 'Enter name',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description',
      multiline: true,
      minRows: 4,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
