import { RHFTextField } from '@/components/ReactHookForm';
import * as yup from 'yup';
import { LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT } from '../RolesAndRight.data';

export const TITLE_FORM_USER: any = {
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]:
    'Add User Role',
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.EDIT_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]:
    'Edit User Role',
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL]:
    'View User Role',
};

export const SUBMIT_BUTTON_TEXT: any = {
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]:
    'Add',
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.EDIT_LOYALTY_PROGRAM_ROLE_AND_RIGHTS]:
    'Save',
  [LOYALTY_PROGRAM_ROLE_AND_RIGHTS_ACTIONS_CONSTANT?.LOYALTY_PROGRAM_ROLE_AND_RIGHTS_DETAIL]:
    'Ok',
};

export const upsertRolesAndRightValidationSchema = yup?.object()?.shape({
  name: yup?.string()?.trim()?.required('Name is required'),
  description: yup?.string()?.trim(),
});

export const upsertRolesAndRightDefaultValues = (data?: any) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    ...data,
  };
};

export const upsertRolesAndRightFormFieldsDynamic = () => [
  {
    id: 1,
    component: RHFTextField,
    componentProps: {
      label: 'Name',
      name: 'name',
      fullWidth: true,
      required: true,
    },
  },
  {
    id: 'description',
    component: RHFTextField,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
  },
];
