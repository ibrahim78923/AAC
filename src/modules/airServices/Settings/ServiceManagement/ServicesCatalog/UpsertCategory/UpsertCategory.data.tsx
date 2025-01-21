import { RHFTextField } from '@/components/ReactHookForm';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import * as Yup from 'yup';

export const upsertServiceCategoryFormValidationSchema = Yup?.object()?.shape({
  categoryName: Yup?.string()
    ?.trim()
    ?.required('Category name is required')
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  description: Yup?.string()
    ?.trim()
    ?.required('Description is required')
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
    ),
});

export const upsertServiceCategoryFormDefaultValues = {
  categoryName: '',
  description: '',
};

export const upsertServiceCategoryFormFields = [
  {
    _id: 1,
    componentProps: {
      name: 'categoryName',
      label: 'Category Name',
      placeholder: 'Enter name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Description',
      multiline: true,
      minRows: 4,
      required: true,
    },
    component: RHFTextField,
  },
];
