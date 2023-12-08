import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  users: Yup?.string()?.required('Field is Required'),
  createdDate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValues = {
  users: '',
  createdDate: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'users',
      label: 'users',
      fullWidth: true,
      select: true,
    },

    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'albertPaul', label: 'Albert Paul' },
      { value: 'nickJames', label: 'Nick James' },
      { value: 'robertFox', label: 'Robert Fox' },
    ],

    component: RHFSelect,

    md: 12,
  },

  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },

    component: RHFDatePicker,

    md: 12,
  },
];
