import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const signInValidationSechema = Yup?.object()?.shape({
  email: Yup?.string()?.required('EMAIL is Required'),
  password: Yup?.string()?.required('PASSWORD is Required'),
});

export const FormDefaultValues = {
  email: '',
  password: '',
};

export const dataArray = [
  {
    componentsprops: {
      id: '1',
      name: 'email',
      label: 'email',
      type: 'email',
      fullwidth: 'true',
      required: 'true',
    },
    component: RHFTextField,
  },
  {
    componentProps: {
      id: '2',
      name: 'password',
      label: 'password',
      type: 'password',
      fullwidth: 'true',
      required: 'true',
    },
    component: RHFTextField,
  },
];
