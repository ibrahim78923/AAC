import { RHFTextField } from '@/components/ReactHookForm';
export const SignUpDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
};

export const SignUpFormFields = [
  {
    componentProps: {
      id: '1',
      name: 'firstName',
      label: 'First Name',
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
      type: 'string',
      fullWidth: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '1',
      name: 'email',
      label: 'email',
      type: 'Email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '2',
      name: 'companyName',
      label: 'CompanyName',
      type: 'CompanyName',
      fullWidth: true,
      required: false,
    },
    component: RHFTextField,
  },
];
