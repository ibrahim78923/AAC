import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const assignCategoryValidationSchema = Yup?.object()?.shape({
  category: Yup?.mixed()?.required('Required'),
});

export const assignCategoryDefaultValues = (data?: any) => {
  return {
    category: data?.category ?? null,
  };
};

export const assignCategoryFieldFunction = (apiQueryAssignCategory: any) => [
  {
    id: 8979,
    componentProps: {
      name: 'category',
      placeholder: 'Search and add category',
      fullWidth: true,
      apiQuery: apiQueryAssignCategory,
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
