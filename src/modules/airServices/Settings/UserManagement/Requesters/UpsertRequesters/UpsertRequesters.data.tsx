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
  email: Yup?.string()
    ?.trim()
    ?.email('Please provide valid email')
    ?.required('Email is required'),
  firstName: Yup?.string()?.trim()?.required('First name is required'),
  lastName: Yup?.string()?.trim()?.required('Last name is required'),
  timezone: Yup?.mixed()?.nullable(),
  jobTitle: Yup?.string()?.trim(),
  phoneNumber: Yup?.string()
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
});

export const upsertRequestersDefaultValues: any = (profileData: any) => {
  return {
    email: profileData?.email ?? '',
    firstName: profileData?.firstName ?? '',
    lastName: profileData?.lastName ?? '',
    jobTitle: profileData?.jobTitle ?? '',
    phoneNumber: profileData?.phoneNumber ?? '',
    timezone: profileData?.timezone ?? null,
    createdAt: new Date(profileData?.createdAt ?? new Date()),
  };
};

export const upsertRequestersArray = (selectedRequester: any) => [
  {
    id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      disabled: !!selectedRequester?._id,
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
      name: 'createdAt',
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
      options: timeZone?.map((timeZone: any) => timeZone?.label),
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
