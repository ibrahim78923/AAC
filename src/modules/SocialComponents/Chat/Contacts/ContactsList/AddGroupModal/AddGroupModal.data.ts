import {
  RHFMultiSearchableSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const addGroupValidationSchema = Yup.object().shape({
  groupTitle: Yup.string().trim().required('Field is Required'),
  candidates: Yup.string().required('Field is Required'),
});

export const addGroupDefaultValues = {
  groupTitle: '',
  candidates: '',
};

export const addGroupFiltersDataArray = [
  {
    componentProps: {
      name: 'groupTitle',
      label: 'Group Title',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'candidates',
      label: 'Candidates',
    },
    options: [
      { value: 'JohnDoe', label: 'John Doe' },
      { value: 'Andrew', label: 'Andrew' },
      { value: 'RichardRobertson', label: 'Richard robertson' },
      { value: 'Franksten', label: 'Franksten' },
    ],
    component: RHFMultiSearchableSelect,
    md: 12,
  },
];
