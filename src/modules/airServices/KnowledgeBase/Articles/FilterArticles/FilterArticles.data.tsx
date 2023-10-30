import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterArticlesValidationSchema = Yup.object().shape({
  status: Yup.string(),
  author: Yup.string(),
});

export const filterArticlesDataDefaultValues = {
  status: '',
  author: '',
};

export const FilterArticlesData = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'Drafts', label: 'Drafts' },
      { value: 'Published', label: 'Published' },
    ],

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

    options: [
      { value: 'Alee', label: 'Alee' },
      { value: 'David', label: 'David' },
      { value: 'Raza', label: 'Raza' },
      { value: 'Sam', label: 'Sam' },
      { value: 'Martiz', label: 'Martiz' },
      { value: 'Luke', label: 'Luke' },
      { value: 'Manpreet', label: 'Manpreet' },
    ],

    component: RHFSelect,
    md: 12,
  },
];
