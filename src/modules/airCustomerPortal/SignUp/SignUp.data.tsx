import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const companyName = [
  { value: 'Cameron Williamson', label: 'Cameron Williamson' },
  { value: 'Cameron', label: 'Cameron' },
];

export const SignUpDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
};

export const SignUpValidationSchema: any = Yup?.object()?.shape({
  firstName: Yup?.string()
    ?.required('firstName is Required')
    ?.max(30, 'character must not be greater then 30'),
  lastName: Yup?.string()?.max(30, 'character must not be greater then 30'),
  email: Yup?.string()
    ?.required('email is Required')
    ?.max(100, 'character must not be greater then 30'),
});

export const SignUpFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter First Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter Last Name',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'Enter Email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'companyName',
      label: 'CompanyName',
      fullWidth: true,
      select: true,
    },
    options: companyName,
    component: RHFSelect,
  },
];
