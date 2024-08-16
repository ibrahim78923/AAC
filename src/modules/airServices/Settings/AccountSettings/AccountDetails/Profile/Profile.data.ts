import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { VALIDATION_CONSTANT } from '@/constants';
import { timeZone } from '@/constants/time-zone';
import * as Yup from 'yup';
import { IProfileOtherData, IProfileWorkData } from './Profile.interface';

export const profileValidationSchema: any = Yup?.object()?.shape({
  firstName: Yup?.string()
    ?.trim()
    ?.required('First name is Required')
    ?.max(30, 'First Name up to 30 characters'),
  lastName: Yup?.string()
    ?.trim()
    ?.required('Last name is Required')
    ?.max(30, 'Last Name up to 30 characters'),
  workPhoneNumber: Yup?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  mobileNumber: Yup?.string()
    ?.trim()
    ?.test(
      'is-valid-phone',
      VALIDATION_CONSTANT?.PHONE_NUMBER?.message,
      function (value) {
        if (value) {
          return VALIDATION_CONSTANT?.PHONE_NUMBER?.regex?.test(value);
        }
        return true;
      },
    ),
  jobTitle: Yup?.string()?.trim()?.max(30, 'Job Title up to 30 characters'),
  language: Yup?.string()?.trim()?.max(30, 'Language up to 30 characters'),
  timeZone: Yup?.mixed()?.nullable(),
  facebookURL: Yup?.string()?.trim(),
  linkedinURL: Yup?.string()?.trim(),
  twitterURL: Yup?.string()?.trim(),
});

export const profileDefaultValues = (profileDetail: any) => {
  return {
    firstName: profileDetail?.firstName ?? '',
    lastName: profileDetail?.lastName ?? '',
    workPhoneNumber: profileDetail?.phoneNumber ?? '',
    mobileNumber: profileDetail?.mobileNumber ?? '',
    companyName: profileDetail?.organization?.name ?? '',
    jobTitle: profileDetail?.jobTitle ?? '',
    language: profileDetail?.language ?? '',
    timeZone: profileDetail?.timezone
      ? timeZone?.find((item: any) => item?.label === profileDetail?.timezone)
      : null,
    facebookURL: profileDetail?.facebookUrl ?? '',
    linkedinURL: profileDetail?.linkedInUrl ?? '',
    twitterURL: profileDetail?.twitterUrl ?? '',
  };
};

export const profileWorkDataArray: IProfileWorkData[] = [
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
      disabled: true,
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

export const profileOtherDataArray: IProfileOtherData[] = [
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
