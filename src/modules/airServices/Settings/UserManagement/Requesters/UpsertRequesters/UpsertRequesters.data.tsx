import {
  RHFAutocomplete,
  RHFDesktopDateTimePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import { REGEX } from '@/constants/validation';
import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

export const upsertRequestersValidationSchema: any = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);

  return Yup?.object()?.shape({
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
      ?.test('is-valid-phone', 'Only UK phone number', function (value) {
        if (value) {
          return REGEX?.PHONE_NUMBER?.test(value);
        }
        return true;
      }),
    ...formSchema,
  });
};

export const upsertRequestersDefaultValues: any = (
  profileData: any,
  form?: any,
) => {
  const initialValues: any = dynamicFormInitialValue(profileData, form);

  return {
    email: profileData?.email ?? '',
    firstName: profileData?.firstName ?? '',
    lastName: profileData?.lastName ?? '',
    jobTitle: profileData?.jobTitle ?? '',
    phoneNumber: profileData?.phoneNumber ?? '',
    timezone: profileData?.timezone ?? null,
    createdAt: new Date(profileData?.createdAt ?? new Date()),
    ...initialValues,
  };
};

export const upsertRequestersArray = (selectedRequester: any) => [
  {
    _id: 1,
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
    _id: 2,
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
    _id: 3,
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
    _id: 4,
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
    _id: 5,
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
    _id: 6,
    componentProps: {
      name: 'createdAt',
      label: 'Date of Request',
      fullWidth: true,
      disabled: true,
    },
    component: RHFDesktopDateTimePicker,
    md: 12,
  },
  {
    _id: 8,
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
