import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
};

export const DuplicateFieldsData = [
  {
    component: RHFTextField,
    md: 12,
    componentProps: {
      name: 'name',
      label: 'Field name',
      required: true,
    },
  },
];
