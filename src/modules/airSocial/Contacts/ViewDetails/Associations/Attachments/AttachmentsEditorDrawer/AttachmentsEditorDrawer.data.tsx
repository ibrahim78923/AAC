import { RHFDropZone } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const attachmentsValidationSchema = Yup?.object()?.shape({
  fileUrl: Yup.string().trim().required('Field is Required'),
});

export const attachmentsDefaultValues = {
  fileUrl: '',
};

export const attachmentsDataArray = [
  {
    id: 'fileUrl',
    componentProps: {
      name: 'fileUrl',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
