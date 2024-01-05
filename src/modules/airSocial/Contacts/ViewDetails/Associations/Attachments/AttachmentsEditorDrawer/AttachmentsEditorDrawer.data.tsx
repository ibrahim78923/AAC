import { RHFDropZone } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const attachmentsValidationSchema = Yup?.object()?.shape({});

export const attachmentsDefaultValues = {
  attachment: '',
};

export const attachmentsDataArray = [
  {
    componentProps: {
      name: 'attachment',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add Attachments',
  Edit: 'Edit Attachments',
  View: 'View Attachments',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
