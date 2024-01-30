import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  requester: Yup.string().required('Field is Required'),
});

export const defaultValues = {
  requester: '',
  subject: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'frequency',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'monthly', label: 'Monthly' },
    ],
    component: RHFSelect,
    lg: 1.5,
  },
  {
    componentProps: {
      name: 'dateRange',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'data', label: 'All data' },
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'thisWeek', label: 'This Week' },
      { value: 'lastWeek', label: 'Last Week' },
      { value: 'thisMonth', label: 'This Month' },
      { value: 'lastMonth', label: 'Last Month' },
      { value: 'thisQuater', label: 'This quarter' },
      { value: 'lastQuarter', label: 'Last Quarter' },
    ],
    component: RHFSelect,
    lg: 1.5,
  },
];
