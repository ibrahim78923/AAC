import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterArticlesValidationSchema = Yup?.object()?.shape({
  status: Yup?.string(),
  authorId: Yup?.string(),
});

export const filterArticlesDataDefaultValues = {
  status: '',
  // authorId: '',
};

const statusOption = ['DRAFT', 'PUBLISHED'];

const authorOption = [
  { value: 'Alee', label: 'Alee' },
  { value: 'David', label: 'David' },
  { value: 'Raza', label: 'Raza' },
  { value: 'Sam', label: 'Sam' },
  { value: 'Martiz', label: 'Martiz' },
  { value: 'Luke', label: 'Luke' },
  { value: 'Manpreet', label: 'Manpreet' },
];
export const filterArticlesData = [
  {
    id: '1',
    componentProps: {
      name: 'status',
      label: 'Status',
      size: 'small',
      placeholder: 'Select',
      fullWidth: true,
      options: statusOption,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'authorId',
      label: 'Author',
      size: 'small',
      placeholder: 'Select',
      fullWidth: true,
      options: authorOption,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
