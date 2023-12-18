import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { timeZone } from '@/constants/time-zone';
import * as Yup from 'yup';

export const upsertRequestersValidationSchema: any = Yup?.object()?.shape({
  email: Yup?.string()?.required('Required'),
  fullName: Yup?.string()?.required('Required'),
  jobTitle: Yup?.string(),
  phoneNumber: Yup?.string(),
  plannedStartDate: Yup?.date(),
  plannedStartTime: Yup?.date(),
});

const jobTitleOptions = ['Senior HR Executive', 'Junior Admin', 'IT Support'];

export const upsertRequestersDefaultValues: any = {
  email: '',
  fullName: '',
  jobTitle: '',
  phoneNumber: '',
  plannedStartDate: new Date(),
  plannedStartTime: new Date(),
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
      name: 'fullName',
      label: 'Full Name',
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
      name: 'jobTitle',
      label: 'Job Title',
      fullWidth: true,
      required: true,
      placeholder: 'Select Job Title',
      options: jobTitleOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    id: 4,
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
    id: 5,
    componentProps: {
      name: 'plannedStartDate',
      label: 'Date of Request',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'plannedStartTime',
      label: '\u00a0\u00a0',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      fullWidth: true,
      name: 'timeZone',
      label: 'Time Zone',
      placeholder: 'Select Time Zone',
      options: timeZone,
      getOptionLabel: (option: any) => option?.label,
    },
    gridLength: 12,
    component: RHFAutocomplete,
  },
];
