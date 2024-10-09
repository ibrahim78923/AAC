import { RHFRadioGroup } from '@/components/ReactHookForm';
import { SERVICE_CATALOG_STATUSES } from '@/constants/strings';
import * as Yup from 'yup';

export const changeStatusValidationSchema = Yup?.object()?.shape({
  status: Yup?.string()?.required('Status is required'),
});

export const changeStatusDefaultValues = {
  status: '',
};

export const changeStatusData = [
  {
    id: 1,
    componentProps: {
      name: 'status',
      defaultValue: 'all',
      options: [
        {
          value: SERVICE_CATALOG_STATUSES?.PUBLISHED,
          label: 'Published',
        },
        {
          value: SERVICE_CATALOG_STATUSES?.DRAFT,
          label: 'Draft',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];
