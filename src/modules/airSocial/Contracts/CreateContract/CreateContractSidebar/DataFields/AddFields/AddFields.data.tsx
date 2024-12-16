import { RHFTextField, RHFSearchableSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  type: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  name: '',
  type: '',
};

export const fieldsData = [
  {
    component: RHFTextField,
    md: 12,
    componentProps: {
      name: 'name',
      label: 'Field name',
      required: true,
    },
  },
  {
    component: RHFSearchableSelect,
    md: 12,
    componentProps: {
      name: 'type',
      label: 'Field type',
      required: true,
      options: [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
        { value: 'date', label: 'Date' },
        { value: 'select', label: 'Select' },
        { value: 'checkbox', label: 'Checkbox' },
      ],
    },
  },
];
