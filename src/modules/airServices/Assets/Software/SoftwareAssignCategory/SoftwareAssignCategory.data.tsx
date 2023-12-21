import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const assignCategoryValidationSchema = Yup?.object()?.shape({
  category: Yup?.mixed()?.required('Required'),
});

export const assignCategoryDefaultValues = (data?: any) => {
  return {
    category: data?.category ?? null,
  };
};

const assignCategoryOptions = ['Add & Assign'];

export const assignCategoryField = [
  {
    id: 8979,
    componentProps: {
      name: 'category',
      placeholder: 'Search and add category',
      fullWidth: true,
      options: assignCategoryOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
