import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const addUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Field is Required'),
  lastName: Yup.string().trim().required('Field is Required'),
  address: Yup.string().trim().required('Field is Required'),
  email: Yup.string().trim().required('Field is Required'),
  role: Yup.string().trim().required('Field is Required'),
  team: Yup.string().trim().required('Field is Required'),
});

export const addUserDefaultValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  email: '',
  phoneNumber: '',
  jobTitle: '',
  role: '',
  team: '',
};

export const addUserFields = [
  {
    id: 'firstName',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter first name',
      required: true,
    },
  },
  {
    id: 'middleName',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'middleName',
      label: 'Middle Name',
      placeholder: 'Enter  middle name',
    },
  },
  {
    id: 'lastName',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter last name',
      required: true,
    },
  },
  {
    id: 'address',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'address',
      label: 'Address',
      placeholder: 'Enter  business address',
      required: true,
    },
  },
  {
    id: 'email',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter business email',
      required: true,
    },
  },
  {
    id: 'phoneNumber',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Enter  phone number',
    },
  },
  {
    id: 'jobTitle',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'UI UX DESIGNER',
    },
  },
  {
    id: 'role',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'role',
      label: 'Assign Role',
      select: true,
      required: true,
    },
    options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'Supervisor', label: 'Supervisor' },
      { value: 'Agent', label: 'Agent' },
    ],
  },
  {
    id: 'team',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'team',
      label: 'Select Team',
      select: true,
      required: true,
    },
    options: [
      { value: 'Alfa', label: 'Alfa' },
      { value: 'Test', label: 'Test' },
      { value: 'Test1', label: 'Test1' },
      { value: 'Orcalo', label: 'Orcalo' },
    ],
  },
];
