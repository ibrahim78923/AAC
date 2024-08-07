import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertUserValidationSchema: any = Yup?.object()?.shape({
  firstName: Yup?.string()?.required('Required'),
  lastName: Yup?.string()?.required('Required'),
  address: Yup?.string()?.required('Required'),
  email: Yup?.string()?.required('Required'),
  phoneNumber: Yup?.string(),
  jobTitle: Yup?.string(),
  role: Yup?.mixed()?.nullable(),
  team: Yup?.mixed()?.nullable(),
  language: Yup?.mixed()?.nullable(),
  facebookUrl: Yup?.string(),
  linkedinUrl: Yup?.string(),
  twitterUrl: Yup?.string(),
});

export const upsertUserDefaultValues = (data?: any) => {
  return {
    firstName: data?.user?.firstName ?? '',
    lastName: data?.user?.lastName ?? '',
    address: data?.address?.composite,
    email: data?.user?.email ?? '',
    phoneNumber: data?.user?.phoneNumber ?? '',
    jobTitle: data?.user?.jobTitle ?? '',
    role: data?.role ?? null,
    team: data?.team ?? null,
    language: data?.user?.language ?? null,
    facebookUrl: data?.user?.facebookUrl ?? '',
    linkedInUrl: data?.user?.linkedInUrl ?? '',
    twitterUrl: data?.user?.twitterUrl ?? '',
  };
};

export const upsertUserArray = (rolesDropdown: any, usersTeamDropdown: any) => [
  {
    id: 1,
    subheading: 'Add a new user to this organization.',
    componentProps: {
      name: 'firstName',
      label: 'First name',
      placeholder: 'Enter first name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      label: 'Last name',
      placeholder: 'Enter last name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Enter business address',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter business email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone number',
      placeholder: 'Enter phone number',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'jobTitle',
      label: 'Job title',
      placeholder: 'UI UX DESIGNER',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'role',
      label: 'Assign Department',
      placeholder: 'Select',
      fullWidth: true,
      apiQuery: rolesDropdown,
      externalParams: { limit: 100 },
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 8,
    componentProps: {
      name: 'team',
      label: 'Select team',
      placeholder: 'Select',
      fullWidth: true,
      apiQuery: usersTeamDropdown,
      externalParams: { limit: 100 },
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
  {
    id: 9,
    componentProps: {
      name: 'language',
      label: 'Language',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 10,
    componentProps: {
      name: 'facebookUrl',
      label: 'Facebook url',
      placeholder: 'paste URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 11,
    componentProps: {
      name: 'linkedInUrl',
      label: 'Linkedin url',
      placeholder: 'paste URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 12,
    componentProps: {
      name: 'twitterUrl',
      label: 'Twitter url',
      placeholder: 'paste URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
