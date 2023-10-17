import { RHFTextField } from '@/components/ReactHookForm';

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
];

export const participantsData = [
  {
    id: '01',
    participant: 'jhon',
  },
];
