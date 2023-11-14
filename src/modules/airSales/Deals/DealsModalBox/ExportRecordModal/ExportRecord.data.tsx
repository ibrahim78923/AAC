import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  file: Yup?.string()?.required('Field is Required'),
});

export const customDefaultValues = {
  file: '',
};

export const recordData = [
  {
    label: 'File Name',
    componentProps: {
      name: 'file',
      placeholder: 'Select',
      select: true,
    },
    options: [
      { label: 'CSV', value: 'csv' },
      { label: 'XLS', value: 'xls' },
    ],
    component: RHFSelect,
    md: 4,
  },
];
