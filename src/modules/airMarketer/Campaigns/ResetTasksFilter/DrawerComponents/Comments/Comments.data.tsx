import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  selectTask: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  selectTask: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'selectTask',
      label: 'Select Task',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'BE', label: 'BE' },
      { value: 'FE', label: 'FE' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'searchCommment',
      label: 'Search comment',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'BE', label: 'BE' },
      { value: 'FE', label: 'FE' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'openCommment',
      label: 'Open comment',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'BE', label: 'BE' },
      { value: 'FE', label: 'FE' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
