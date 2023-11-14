import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
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
