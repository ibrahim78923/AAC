import { RHFEditor } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const replyQueryValidationSchema = Yup.object().shape({
  answer: Yup.string().trim().required('Field is Required'),
});

export const replyQueryDefaultValues = {
  answer: '',
};

export const replyQueryFiltersDataArray = [
  {
    componentProps: {
      name: 'answer',
      label: 'Answer',
    },
    component: RHFEditor,
    md: 12,
  },
];
