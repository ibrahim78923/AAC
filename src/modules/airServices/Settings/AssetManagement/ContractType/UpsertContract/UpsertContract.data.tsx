import { RHFTextField } from '@/components/ReactHookForm';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import * as Yup from 'yup';

export const ContractFieldsFormValidationSchema: any = Yup?.object()?.shape({
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

export const ContractFieldsFormDefaultValues: any = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
  };
};

export const ContractFieldsFormDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
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
