import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  email: Yup?.string()?.email('Invalid email')?.required('Required Field'),
});

export const initValues = {
  email: '',
};

export const formFields = [
  {
    id: 'email',
    component: RHFTextField,
    componentProps: {
      name: 'email',
      label: 'Email',
      required: true,
      placeholder: 'abc@gmail.co.uk',
    },
  },
];
