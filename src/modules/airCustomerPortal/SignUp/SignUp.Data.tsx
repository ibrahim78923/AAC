import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const SignUpDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
};
export const signupValidationSchema: any = Yup?.object()?.shape({
  firstname: Yup?.string()?.required('firstname is Required'),
  email: Yup?.string()?.required('email is Required'),
});
export const SignUpFormFields = [
  {
    componentProps: {
      id: '1',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter First Name',
      type: 'string',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '2',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter last Name',
      type: 'string',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '3',
      name: 'email',
      label: 'email',
      type: 'Email',
      placeholder: 'Enter Email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '4',
      name: 'companyName',
      label: 'CompanyName',
      type: 'CompanyName',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
      { value: 'Cameron Williamson', label: 'Cameron Williamson' },
    ],
    component: RHFSelect,
  },
];
