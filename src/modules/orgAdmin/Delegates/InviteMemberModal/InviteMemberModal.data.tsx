import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const inviteMemberValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const inviteMemberdefaultValues = {
  email: '',
};

export const inviteMemberArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      required: true,
      placeholder: 'Enter Email',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
