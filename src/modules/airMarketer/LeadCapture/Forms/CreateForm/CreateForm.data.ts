import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dynamicallyFormValidationSchema = Yup.object().shape({
  email: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dynamicallyFormDefaultValues = {
  email: '',
};

export const dynamicallyFormArray = [
  {
    componentProps: {
      name: 'email',
      label: 'Email',
      fullWidth: true,
      placeholder: 'Enter form email',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
