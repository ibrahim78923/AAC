import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const accountDetailProfileValidationSchema = Yup?.object()?.shape({
  firstName: Yup?.string()
    ?.required('Required')
    ?.max(30, 'First Name up to 30 characters'),
  middleName: Yup?.string()?.max(30, 'Middle Name up to 30 characters'),
  lastName: Yup?.string()
    ?.required('Required')
    ?.max(30, 'Last Name up to 30 characters'),
  workPhoneNumber: Yup?.number(),
  mobileNumber: Yup?.number(),
  companyName: Yup?.string()?.max(100, 'Company Name up to 30 characters'),
  jobTitle: Yup?.string(),
  language: Yup?.string(),
  timeZone: Yup?.string(),
  facebookURL: Yup?.string(),
  linkedinURL: Yup?.string(),
  twitterURL: Yup?.string(),
});

export const accountDetailProfileDefaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  workPhoneNumber: 0,
  mobileNumber: 0,
  companyName: '',
  jobTitle: '',
  language: 'English',
  timeZone: '',
  facebookURL: '',
  linkedinURL: '',
  twitterURL: '',
};

const timeFormatOptions = [
  '(GMT-04:00) Eastern Time (US)',
  '(GMT-11:00)  Midway',
  '(GMT-10:00)  Sweden',
];

export const profileWorkDataArray = [
  {
    _id: 2786,
    gridLength: 6,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      size: 'small',
      required: true,
      placeholder: 'John',
    },
    component: RHFTextField,
  },
  {
    _id: 6578,
    gridLength: 6,
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 9478,
    gridLength: 6,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      size: 'small',
      required: true,
      placeholder: 'Doe',
    },
    component: RHFTextField,
  },

  {
    _id: 6756,
    gridLength: 6,
    componentProps: {
      name: 'workPhoneNumber',
      label: 'Work Phone Number',
      type: 'number',
      size: 'small',
      placeholder: 'Phone Number',
    },
    component: RHFTextField,
  },
  {
    _id: 3456,
    gridLength: 6,
    componentProps: {
      name: 'mobileNumber',
      label: 'Mobile Number',
      type: 'number',
      size: 'small',
      placeholder: '+12 12345',
    },
    component: RHFTextField,
  },
  {
    _id: 7757,
    gridLength: 6,
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      size: 'small',
      placeholder: 'Orcalo Holdings',
    },
    component: RHFTextField,
  },

  {
    _id: 8974,
    gridLength: 6,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      size: 'small',
      placeholder: 'UI UX Designer',
    },
    component: RHFTextField,
  },
];

export const profileOtherDataArray = [
  {
    _id: 7867,
    gridLength: 6,
    componentProps: {
      name: 'language',
      label: 'Language',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 5868,
    gridLength: 6,
    componentProps: {
      name: 'timeZone',
      label: 'Time Zone',
      type: 'text',
      size: 'small',
      placeholder: '(GMT-11:00) London',
      options: timeFormatOptions,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 7868,
    gridLength: 6,
    componentProps: {
      name: 'facebookURL',
      label: 'Facebook URL',
      type: 'text',
      size: 'small',
      placeholder: 'Jhondoe@ceative.co.uk',
    },
    component: RHFTextField,
  },
  {
    _id: 5678,
    gridLength: 6,
    componentProps: {
      name: 'linkedinURL',
      label: 'Linkedin URL',
      type: 'text',
      size: 'small',
      placeholder: 'Jhondoe@ceative.co.uk',
    },
    component: RHFTextField,
  },
  {
    _id: 9769,
    gridLength: 6,
    componentProps: {
      name: 'twitterURL',
      label: 'Twitter URL',
      type: 'text',
      size: 'small',
      placeholder: 'Jhondoe@ceative.co.uk',
    },
    component: RHFTextField,
  },
];
