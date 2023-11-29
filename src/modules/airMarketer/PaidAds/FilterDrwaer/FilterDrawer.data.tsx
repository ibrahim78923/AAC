import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const filterValidationSchema = Yup.object().shape({
  role: Yup.string(),
  organization: Yup.string(),
  products: Yup.string(),
});

export const filterDefaultValues = {
  role: '',
  organization: '',
  products: '',
  createdDate: null,
};

export const usersFilterArray = [
  {
    componentProps: {
      name: 'teams',
      label: 'Users & Teams',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'ALL', label: 'All' },
      { value: 'DRAFT', label: 'Draft' },
      { value: 'PUBLISHED', label: 'Published' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'accounts',
      label: 'Accounts',
      fullWidth: true,
      select: true,
    },
    options: [{ value: '', label: '' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'date',
      label: 'Date Range',
      fullWidth: true,
      select: true,
    },
    options: [{ value: '', label: '' }],
    component: RHFDatePicker,
    md: 12,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
    },
    component: RHFSelect,
    md: 12,
  },
];
