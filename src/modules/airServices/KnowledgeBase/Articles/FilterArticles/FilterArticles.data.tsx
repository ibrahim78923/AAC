import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterArticlesValidationSchema = Yup?.object()?.shape({
  status: Yup?.string(),
  author: Yup?.string(),
});

export const filterArticlesDataDefaultValues = {
  status: '',
  author: '',
};
const statusOption = [
  { value: 'Drafts', label: 'Drafts' },
  { value: 'Published', label: 'Published' },
];
const authorOption = [
  { value: 'Alee', label: 'Alee' },
  { value: 'David', label: 'David' },
  { value: 'Raza', label: 'Raza' },
  { value: 'Sam', label: 'Sam' },
  { value: 'Martiz', label: 'Martiz' },
  { value: 'Luke', label: 'Luke' },
  { value: 'Manpreet', label: 'Manpreet' },
];
export const FilterArticlesData = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },

    options: statusOption,

    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'author',
      label: 'Author',
      fullWidth: true,
      select: true,
    },

    options: authorOption,

    component: RHFSelect,
    md: 12,
  },
];
