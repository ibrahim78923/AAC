import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Field is Required'),
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
      placeholder: 'abc@gmail.com , Johndoe@ceative.co.uk',
    },
  },
];
