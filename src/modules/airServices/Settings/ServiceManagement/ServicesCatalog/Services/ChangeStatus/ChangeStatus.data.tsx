import { RHFRadioGroup } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const changeStatusValidationSchema = Yup?.object()?.shape({
  status: Yup?.string(),
  published: Yup?.string(),
  draft: Yup?.string(),
});
export const changeStatusDefaultValues = {
  status: '',
  published: '',
  draft: '',
};

export const changeStatusData = [
  {
    id: 1,
    componentProps: {
      name: 'status',
      fullWidth: true,
      defaultValue: 'all',
      options: [
        {
          value: 'PUBLISHED',
          label: 'Published',
        },
        {
          value: 'DRAFT',
          label: 'Draft',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];
