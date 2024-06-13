import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const newAgentStatusValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Field is Required'),
});

export const newAgentStatusDefaultValues = {
  name: '',
};

export const newAgentStatusFields = [
  {
    id: 'name',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'name',
      label: 'Status Name',
      required: true,
    },
  },
];
