import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { VALIDATION_CONSTANT } from '@/constants';
import { timeZone } from '@/constants/time-zone';
import * as Yup from 'yup';

export const upsertRequestersValidationSchema: any = Yup?.object()?.shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .matches(/@/, 'Email must contain the @ symbol'),
  firstName: Yup?.string()?.required('Required'),
  lastName: Yup?.string()?.required('Required'),
  timezone: Yup?.mixed()?.nullable(),
  jobTitle: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .required('Required')
    .matches(
      VALIDATION_CONSTANT.PHONE_NUMBER.regex,
      VALIDATION_CONSTANT.PHONE_NUMBER.message,
    ),
});

export const upsertRequestersDefaultValues: any = (profileData: any) => {
  return {
    email: profileData?.[0]?.email ?? '',
    firstName: profileData?.[0]?.firstName ?? '',
    lastName: profileData?.[0]?.lastName ?? '',
    jobTitle: profileData?.[0]?.jobTitle ?? '',
    phoneNumber: profileData?.[0]?.phoneNumber ?? '',
    createdAt: new Date(),
    updatedAt: new Date(),
    timezone: profileData?.[0]?.timezone ?? '',
  };
};

export const upsertRequestersArray = [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      required: true,
      placeholder: 'Email',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      fullWidth: true,
      required: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
      required: true,
      placeholder: 'Job Title',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 5,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      fullWidth: true,
      placeholder: 'Phone Number',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 6,
    componentProps: {
      name: 'createdAt',
      label: 'Date of Request',
      fullWidth: true,
      disabled: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    id: 7,
    componentProps: {
      name: 'updatedAt',
      label: '\u00a0\u00a0',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTimePicker,
    md: 4,
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: 'timezone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
      options: timeZone?.map((timeZone) => timeZone?.label),
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
