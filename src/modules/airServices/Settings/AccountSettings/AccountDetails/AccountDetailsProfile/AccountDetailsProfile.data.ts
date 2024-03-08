import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import * as Yup from 'yup';

export const accountDetailProfileValidationSchema = Yup?.object()?.shape({
  firstName: Yup?.string()
    ?.required('Required')
    ?.max(30, 'First Name up to 30 characters'),
  lastName: Yup?.string()
    ?.required('Required')
    ?.max(30, 'Last Name up to 30 characters'),
  workPhoneNumber: Yup?.string(),
  mobileNumber: Yup?.string(),
  companyName: Yup?.string()?.max(100, 'Company Name up to 30 characters'),
  jobTitle: Yup?.string(),
  language: Yup?.string(),
  timeZone: Yup?.mixed()?.nullable(),
  facebookURL: Yup?.string(),
  linkedinURL: Yup?.string(),
  twitterURL: Yup?.string(),
});

export const accountDetailProfileDefaultValues = (profileDetail: any) => {
  return {
    firstName: profileDetail?.firstName ?? '',
    lastName: profileDetail?.lastName ?? '',
    workPhoneNumber: profileDetail?.workPhoneNumber ?? '',
    mobileNumber: profileDetail?.phoneNumber ?? '',
    companyName: profileDetail?.organization?.name ?? '',
    jobTitle: profileDetail?.jobTitle ?? '',
    language: profileDetail?.language ?? '',
    timeZone: profileDetail?.timeZone ?? null,
    facebookURL: profileDetail?.facebookUrl ?? '',
    linkedinURL: profileDetail?.linkedInUrl ?? '',
    twitterURL: profileDetail?.twitterUrl ?? '',
  };
};

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
    },
    component: RHFTextField,
  },

  {
    _id: 6756,
    gridLength: 6,
    componentProps: {
      name: 'workPhoneNumber',
      label: 'Work Phone Number',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 3456,
    gridLength: 6,
    componentProps: {
      name: 'mobileNumber',
      label: 'Mobile Number',
      size: 'small',
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
      options: timeZone,
      getOptionLabel: (option: any) => option?.label,
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
    },
    component: RHFTextField,
  },
];
