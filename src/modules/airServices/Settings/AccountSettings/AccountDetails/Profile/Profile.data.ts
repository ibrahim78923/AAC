import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import * as Yup from 'yup';
import { CHARACTERS_LIMIT, REGEX } from '@/constants/validation';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

const option = ['English'];
export const profileValidationSchema: any = Yup?.object()?.shape({
  firstName: Yup?.string()
    ?.trim()
    ?.required('First name is required')
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_PROFILE_FIRST_NAME_MAX_CHARACTERS,
      `Maximum Characters Limit is ${CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_PROFILE_FIRST_NAME_MAX_CHARACTERS} `,
    ),
  lastName: Yup?.string()
    ?.trim()
    ?.required('Last name is required')
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_PROFILE_LAST_NAME_MAX_CHARACTERS,
      `Maximum Characters Limit is ${CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_PROFILE_LAST_NAME_MAX_CHARACTERS} `,
    ),
  workPhoneNumber: Yup?.string()
    ?.trim()
    ?.test('is-valid-phone', 'Only UK phone number', function (value) {
      if (value) {
        return REGEX?.PHONE_NUMBER?.test(value);
      }
      return true;
    }),
  mobileNumber: Yup?.string()
    ?.trim()
    ?.test('is-valid-phone', 'Only UK phone number', function (value) {
      if (value) {
        return REGEX?.PHONE_NUMBER?.test(value);
      }
      return true;
    }),
  jobTitle: Yup?.string()
    ?.trim()
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_PROFILE_JOB_TITLE_MAX_CHARACTERS,
      `Maximum Characters Limit is ${CHARACTERS_LIMIT?.SERVICES_ACCOUNT_SETTINGS_ACCOUNT_DETAILS_PROFILE_JOB_TITLE_MAX_CHARACTERS} `,
    ),
  language: Yup?.string()?.trim(),
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

export const profileWorkDataArray: ReactHookFormFieldsI[] = [
  {
    _id: 1,
    md: 6,
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
    _id: 2,
    md: 6,
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
    _id: 3,
    md: 6,
    componentProps: {
      name: 'workPhoneNumber',
      label: 'Work Phone Number',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 4,
    md: 6,
    componentProps: {
      name: 'mobileNumber',
      label: 'Mobile Number',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 5,
    md: 6,
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
    _id: 6,
    md: 6,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
];

export const profileOtherDataArray: ReactHookFormFieldsI[] = [
  {
    _id: 7,
    md: 6,
    componentProps: {
      name: 'language',
      label: 'Language',
      type: 'text',
      size: 'small',
      options: option,
    },
    component: RHFAutocomplete,
  },
  {
    _id: 8,
    md: 6,
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
    _id: 9,
    md: 6,
    componentProps: {
      name: 'facebookURL',
      label: 'Facebook URL',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 10,
    md: 6,
    componentProps: {
      name: 'linkedinURL',
      label: 'Linkedin URL',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
  {
    _id: 11,
    md: 6,
    componentProps: {
      name: 'twitterURL',
      label: 'Twitter URL',
      type: 'text',
      size: 'small',
    },
    component: RHFTextField,
  },
];
