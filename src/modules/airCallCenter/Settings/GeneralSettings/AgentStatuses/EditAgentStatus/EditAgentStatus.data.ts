import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const editAgentStatusValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Field is Required'),
  afterCallWorkTime: Yup.number()
    .min(0, 'After call time must be at least 0')
    .max(3600, 'After call time must be at most 3600'),
});

export const editAgentStatusDefaultValues = {
  name: '',
  afterCallWorkTime: 0,
};

export const editAgentStatusFields = [
  {
    id: 'name',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'name',
      label: 'Status Name',
      placeholder: 'Presenting',
    },
  },
];
