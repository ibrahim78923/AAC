import { RHFFileImport } from '@/components/ReactHookForm';
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
    component: RHFFileImport,
    md: 12,
  },
];
