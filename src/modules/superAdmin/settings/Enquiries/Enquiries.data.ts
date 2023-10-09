import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const enquiriesFiltersValidationSchema = Yup.object().shape({
  candidates: Yup.string().trim().required('Field is Required'),
  applyDate: Yup.string().trim().required('Field is Required'),
  status: Yup.string().trim().required('Field is Required'),
});

export const enquiriesFiltersDefaultValues = {
  candidates: '',
  applyDate: '',
  status: '',
};

export const enquiriesFiltersFiltersDataArray = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      select: true,
    },
    options: [
      { value: 'Done', label: 'Done' },
      { value: 'Pending', label: 'Pending' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
