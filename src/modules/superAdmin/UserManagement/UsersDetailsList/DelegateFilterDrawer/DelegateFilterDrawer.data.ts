import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const DelegateValidationSchema = Yup.object().shape({
  status: Yup.string().required('Field is Required'),
  fromDate: Yup.date().required('Field is Required'),
  toDate: Yup.date().required('Field is Required'),
});

export const DelegateDefaultValues = {
  status: '',
  fromDate: new Date(),
  toDate: new Date(),
};

export const DelegateArray = [
  {
    title: 'Status',
    componentProps: {
      name: 'status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'complete', label: 'Complete' },
      { value: 'pending', label: 'Pending' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    title: 'From Date',
    componentProps: {
      name: 'fromDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
  {
    title: 'To Date',
    componentProps: {
      name: 'toDate',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 12,
  },
];
