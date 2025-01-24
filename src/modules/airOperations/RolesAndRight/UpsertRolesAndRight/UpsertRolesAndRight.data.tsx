import { RHFTextField } from '@/components/ReactHookForm';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import * as yup from 'yup';
import {
  IFormUser,
  IUpsertRolesAndRightFormData,
} from './UpsertRolesAndRight.interface';
import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';

export const TITLE_FORM_USER: IFormUser = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Add User Role',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Edit User Role',
  [GENERIC_UPSERT_FORM_CONSTANT?.VIEW]: 'View User Role',
};

export const BUTTON_TITLE_FORM_USER: IFormUser = {
  [GENERIC_UPSERT_FORM_CONSTANT?.ADD]: 'Submit',
  [GENERIC_UPSERT_FORM_CONSTANT?.EDIT]: 'Update',
  [GENERIC_UPSERT_FORM_CONSTANT?.VIEW]: 'Ok',
};

export const upsertRolesAndRightValidationSchema = yup?.object()?.shape({
  name: yup
    ?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `The maximum character limit of name is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    )
    ?.required('Name is required'),
  description: yup
    ?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
      `The maximum character limit of description is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
    ),
});

export const upsertRolesAndRightDefaultValues = (
  data?: IUpsertRolesAndRightFormData,
) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    ...data,
  };
};

export const upsertRolesAndRightFormFieldsDynamic = () => [
  {
    _id: 1,
    component: RHFTextField,
    md: 7,
    componentProps: {
      label: 'Name',
      name: 'name',
      fullWidth: true,
      required: true,
    },
  },
  {
    _id: 'description',
    component: RHFTextField,
    md: 7,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
  },
];
