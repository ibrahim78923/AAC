import { RHFCheckbox } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const changeStatusValidationSchema = Yup?.object()?.shape({
  published: Yup?.string(),
  draft: Yup?.string(),
});
export const changeStatusDefaultValues = {
  published: '',
  draft: '',
};

export const changeStatusData = [
  {
    id: 1,
    componentProps: {
      name: 'published',
      label: 'Published',
    },
    component: RHFCheckbox,
    md: 4,
  },
  {
    id: 2,
    componentProps: {
      name: 'draft',
      label: 'Draft',
    },
    component: RHFCheckbox,
    md: 4,
  },
];
