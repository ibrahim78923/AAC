import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const jobTitleOptions = [
  'Senior HR Executive',
  'Software Engineer',
  'Software Developer',
];

export const upsertUserValidationSchema: any = Yup?.object()?.shape({
  firstName: Yup?.string()?.required('Required'),
  middleName: Yup?.string(),
  lastName: Yup?.string()?.required('Required'),
  address: Yup?.string()?.required('Required'),
  email: Yup?.string()?.required('Required'),
  phoneNumber: Yup?.string(),
  jobTitle: Yup?.string(),
  assignRole: Yup?.string()?.required('Required'),
  selectTeam: Yup?.string()?.required('Required'),
  language: Yup?.string(),
  facebookUrl: Yup?.string(),
  linkedinUrl: Yup?.string(),
  twitterUrl: Yup?.string(),
});

export const upsertUserData = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'E',
    lastName: 'Doe',
    address: 'Enter business address',
    email: '746 SpringfieldRoad',
    phoneNumber: '+447975777666',
    jobTitle: 'UI UX Designer',
    assignRole: 'Designer',
    selectTeam: 'Alfa',
    language: 'English',
    facebookUrl: 'facebook.com/johnDoe',
    linkedinUrl: 'Linkedin.com/johnDoe',
    twitterUrl: 'Twitter.com/johnDoe',
  },
];
export const upsertUserDefaultValues: any = {
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  assignRole: '',
  selectTeam: '',
  language: '',
  facebookUrl: '',
  linkedinUrl: '',
  twitterUrl: '',
};

export const upsertUserArray = [
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
      name: 'middleName',
      label: 'Middle name',
      placeholder: 'Enter middle name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
      name: 'assignRole',
      label: 'Assign role',
      placeholder: 'Select role',
      fullWidth: true,
      required: true,
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'selectTeam',
      label: 'Select team',
      placeholder: 'Select',
      fullWidth: true,
      required: true,
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'language',
      label: 'Language',
      placeholder: 'English',
      fullWidth: true,
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 8,
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
    id: 9,
    componentProps: {
      name: 'linkedinUrl',
      label: 'Linkedin url',
      placeholder: 'paste URL',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 10,
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
