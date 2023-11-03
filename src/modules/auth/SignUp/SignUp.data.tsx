import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Field is Required'),
  email: Yup.string().required('Field is Required'),
  CRNNumber: Yup.string().required('Field is Required'),
  OrganizationName: Yup.string().required('Field is Required'),
  employeesNumber: Yup.string().required('Field is Required'),
  phoneNumber: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  fullName: '',
  email: '',
  CRNNumber: '',
  OrganizationName: '',
  employeesNumber: '',
  phoneNumber: '',
};

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
      name: 'OrganizationName',
      label: 'Organization Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
