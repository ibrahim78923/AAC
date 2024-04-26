import { RHFDropZone } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const attachmentsValidationSchema = Yup?.object()?.shape({
  attachment: Yup.mixed().required('File is required'),
});

export const attachmentsDefaultValues = {
  attachment: null,
};

export const attachmentsDataArray = [
  {
    id: 'attachment',
    componentProps: {
      name: 'attachment',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
