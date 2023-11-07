import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  organizationNumber: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required('Field is Required'),
  organizationName: Yup.string().required('Field is Required'),
  employeesNumber: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().required('Field is Required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const defaultValues = {
  fullName: '',
  email: '',
  organizationNumber: {
    label: '',
    value: '',
  },
  verifyEmployees: '',
  organizationName: '',
  employeesNumber: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

export const options = [
  { value: 'To-do', label: 'To-do' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Call reminder', label: 'Call reminder' },
  { value: 'Call ', label: 'Call ' },
];

export const noOfEmployee = [
  { value: '0001', label: '001' },
  { value: '0002', label: '0200' },
  { value: '1000-5000', label: '100-500' },
  { value: '5000+ ', label: '500+ ' },
];

export const contactsDataArray = [
  {
    componentProps: {
      name: 'fullName',
      label: 'Full Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'CRNNumber',
      label: 'Company Registration Number (CRN) ',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'organizationNumber',
      label: 'Organization Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
