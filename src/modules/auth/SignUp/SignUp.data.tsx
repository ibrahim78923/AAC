import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required field'),
  lastName: Yup.string().required('Required field'),
  email: Yup.string().required('Required field'),
  organizationName: Yup.string().required('Required field'),
  crn: Yup.string().required('Required field'),
  numberOfEmployees: Yup.string().required('Required field'),
  phoneNumber: Yup.string().required('Required field'),
  products: Yup.array().min(1, 'Required field')?.required('Required field'),
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
  firstName: '',
  lastName: '',
  email: '',
  crn: '',
  products: [],
  enableEmployeeVerification: false,
  organizationName: '',
  numberOfEmployees: '',
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
  { value: '0001', label: '10' },
  { value: '0002', label: '200' },
  { value: '1000-5000', label: '200-500' },
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
      GridView: 6,
    },
    component: RHFMultiCheckbox,
    options: [
      { value: '0001', label: '001' },
      { value: '0002', label: '0200' },
      { value: '1000-5000', label: '100-500' },
      { value: '5000+ ', label: '500+ ' },
    ],
    md: 12,
  },
];
