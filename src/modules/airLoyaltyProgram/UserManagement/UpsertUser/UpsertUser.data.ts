import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const loyaltyUserLanguage = [
  {
    _id: 'English',
    label: 'English',
  },
];

export const TITLE_FORM_USER = {
  ADD: 'Add User',
  EDIT: 'Edit User',
  VIEW: 'View User',
};

export const upsertUserValidationSchema = Yup.object().shape({
  firstName: Yup?.string()?.trim()?.required('first Name is required'),
  lastName: Yup?.string()?.trim()?.required('Last Name is required'),
  address: Yup?.string()?.trim()?.required('Address is required'),
  email: Yup?.string()?.email('Invalid email')?.required('Required'),
  phoneNumber: Yup?.string()?.trim(),
  jobTitle: Yup?.string()?.trim(),
  role: Yup?.mixed()?.nullable()?.required('Role is required'),
  language: Yup?.mixed()?.nullable(),
  facebookUrl: Yup?.string()?.trim(),
  linkedInUrl: Yup?.string()?.trim(),
  twitterUrl: Yup?.string()?.trim(),
});

export const upsertUserDefaultValues = (data?: any) => {
  return {
    firstName: data?.user?.firstName ?? '',
    lastName: data?.user?.lastName ?? '',
    address: data?.user?.address ?? '',
    email: data?.user?.email ?? '',
    phoneNumber: data?.user?.phoneNumber ?? '',
    jobTitle: data?.user?.jobTitle ?? '',
    role: data?.role ?? null,
    language:
      loyaltyUserLanguage?.find(
        (item: any) => item?._id === data?.user?.language,
      ) ?? null,
    facebookUrl: data?.user?.facebookUrl ?? '',
    linkedInUrl: data?.user?.linkedInUrl ?? '',
    twitterUrl: data?.user?.twitterUrl ?? '',
  };
};

export const upsertUserFormFieldsDynamic = (
  roleApiQuery?: any,
  roleApiQueryParams?: any,
) => [
  {
    id: 1,

    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter First Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,

    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter Last Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,

    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Enter Address',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,

    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 6,

    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Enter Phone Number',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 7,

    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'Enter Job Title',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 8,
    componentProps: {
      name: 'role',
      label: 'Assign role',
      placeholder: 'Select role',
      fullWidth: true,
      apiQuery: roleApiQuery,
      externalParams: roleApiQueryParams,
      required: true,
      getOptionLabel: (option: any) => option?.name,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 9,
    componentProps: {
      name: 'language',
      label: 'Language',
      placeholder: 'Select Language',
      fullWidth: true,
      options: loyaltyUserLanguage,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 10,

    componentProps: {
      name: 'facebookUrl',
      label: 'Facebook Url',
      placeholder: 'Enter Facebook Url',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 11,

    componentProps: {
      name: 'linkedInUrl',
      label: 'LinkedIn Url',
      placeholder: 'Enter linkedIn Url',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 12,

    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter Url',
      placeholder: 'Enter Twitter Url',
      fullWidth: true,
    },
    component: RHFTextField,
  },
];
