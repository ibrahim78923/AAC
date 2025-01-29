import { RHFTextField } from '@/components/ReactHookForm';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import * as Yup from 'yup';

export const AssetTypeFormValidationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    )
    ?.required('Name is required'),
  description: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
    ),
});

export const AssetFieldFormDefaultValues: any = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
  };
};

export const assetFieldFormFields = [
  {
    _id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
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
      rows: 3,
    },
    component: RHFTextField,
  },
];
