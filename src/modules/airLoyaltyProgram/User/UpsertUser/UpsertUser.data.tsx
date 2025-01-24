import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { UpsertUserFormDefaultValuesI } from './UpsertUser.interface';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { RoleFieldDropdown } from '../UserFormFields/RoleFieldDropdown';
import { LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT } from '../User.data';
import { CHARACTERS_LIMIT } from '@/constants/validation';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const {
  LOYALTY_PROGRAM_USER_FIRST_NAME_MAX_CHARACTERS,
  LOYALTY_PROGRAM_USER_LAST_NAME_MAX_CHARACTERS,
  LOYALTY_PROGRAM_USER_ADDRESS_MAX_CHARACTERS,
  LOYALTY_PROGRAM_USER_JOB_TITLE_MAX_CHARACTERS,
} = CHARACTERS_LIMIT ?? {};

export const userLanguage: AutocompleteOptionsI[] = [
  {
    _id: 'English',
    label: 'English',
  },
];

export const TITLE_FORM_USER = {
  [LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_USERS]:
    'Add User',
  [LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.EDIT_LOYALTY_PROGRAM_USERS]:
    'Edit User',
  [LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.LOYALTY_PROGRAM_USERS_DETAIL]:
    'View User',
};

export const SUBMIT_BUTTON_TEXT = {
  [LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.ADD_LOYALTY_PROGRAM_USERS]:
    GENERIC_UPSERT_FORM_CONSTANT?.ADD,
  [LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.EDIT_LOYALTY_PROGRAM_USERS]:
    GENERIC_UPSERT_FORM_CONSTANT?.EDIT,
  [LOYALTY_PROGRAM_USERS_ACTIONS_CONSTANT?.LOYALTY_PROGRAM_USERS_DETAIL]:
    GENERIC_UPSERT_FORM_CONSTANT?.SAVE,
};

export const upsertUserValidationSchema = Yup.object().shape({
  firstName: Yup?.string()
    ?.trim()
    ?.required('First name is required')
    ?.max(
      LOYALTY_PROGRAM_USER_FIRST_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${LOYALTY_PROGRAM_USER_FIRST_NAME_MAX_CHARACTERS}`,
    ),
  lastName: Yup?.string()
    ?.trim()
    ?.required('Last name is required')
    ?.max(
      LOYALTY_PROGRAM_USER_LAST_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${LOYALTY_PROGRAM_USER_LAST_NAME_MAX_CHARACTERS}`,
    ),
  address: Yup?.string()
    ?.trim()
    ?.required('Address is required')
    ?.max(
      LOYALTY_PROGRAM_USER_ADDRESS_MAX_CHARACTERS,
      `Maximum characters limit is ${LOYALTY_PROGRAM_USER_ADDRESS_MAX_CHARACTERS}`,
    ),
  email: Yup?.string()?.email('Invalid email')?.required('Email is required'),
  phoneNumber: Yup?.string()?.trim(),
  jobTitle: Yup?.string()
    ?.trim()
    ?.max(
      LOYALTY_PROGRAM_USER_JOB_TITLE_MAX_CHARACTERS,
      `Maximum characters limit is ${LOYALTY_PROGRAM_USER_JOB_TITLE_MAX_CHARACTERS}`,
    ),
  role: Yup?.mixed()?.nullable()?.required('Role is required'),
  language: Yup?.mixed()?.nullable(),
  facebookUrl: Yup?.string()?.trim(),
  linkedInUrl: Yup?.string()?.trim(),
  twitterUrl: Yup?.string()?.trim(),
});

export const upsertUserDefaultValues = (
  data?: UpsertUserFormDefaultValuesI,
) => {
  return {
    firstName: data?.user?.firstName ?? '',
    lastName: data?.user?.lastName ?? '',
    address: data?.user?.address?.composite
      ? data?.user?.address?.composite
      : data?.user?.address ?? '',
    email: data?.user?.email ?? '',
    phoneNumber: data?.user?.phoneNumber ?? '',
    jobTitle: data?.user?.jobTitle ?? '',
    role: data?.role ?? null,
    language:
      userLanguage?.find(
        (item: AutocompleteOptionsI) => item?._id === data?.user?.language,
      ) ?? null,
    facebookUrl: data?.user?.facebookUrl ?? '',
    linkedInUrl: data?.user?.linkedInUrl ?? '',
    twitterUrl: data?.user?.twitterUrl ?? '',
  };
};

export const upsertUserFormFieldsDynamic = (disableEmailField: boolean) => [
  {
    _id: 1,
    componentProps: {
      name: 'firstName',
      label: 'First name',
      placeholder: 'Enter first name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      name: 'lastName',
      label: 'Last name',
      placeholder: 'Enter last name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Enter address',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 4,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      fullWidth: true,
      required: true,
      disabled: disableEmailField,
    },
    component: RHFTextField,
  },
  {
    _id: 5,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone number',
      placeholder: 'Enter phone number',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    _id: 6,
    componentProps: {
      name: 'jobTitle',
      label: 'Job title',
      placeholder: 'Enter job title',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    _id: 7,
    component: RoleFieldDropdown,
  },
  {
    _id: 8,
    componentProps: {
      name: 'language',
      label: 'Language',
      placeholder: 'Select language',
      fullWidth: true,
      options: userLanguage,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 9,
    componentProps: {
      name: 'facebookUrl',
      label: 'Facebook url',
      placeholder: 'Enter facebook url',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    _id: 10,
    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn url',
      placeholder: 'Enter linkedIn url',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    _id: 11,
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter url',
      placeholder: 'Enter twitter url',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
