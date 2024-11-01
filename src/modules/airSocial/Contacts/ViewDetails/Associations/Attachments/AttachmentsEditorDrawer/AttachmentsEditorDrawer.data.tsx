import { RHFDropzonePreviewAllTypes } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const attachmentsValidationSchema = Yup?.object()?.shape({
  attachment: Yup.mixed().required('File is required'),
});

export const attachmentsDefaultValues = (data: any = {}) => ({
  attachment: data?.s3UploadObject ?? null,
});

export const attachmentsDataArray = (disabled: boolean = false) => [
  {
    id: 'attachment',
    componentProps: {
      name: 'attachment',
      label: 'Attachment',
      fullWidth: true,
      disabled: disabled,
      fileType: 'PNG, JPG, and PDF (max 2.44 MB)',
      accept: {
        'image/png': ['.png', '.PNG'],
        'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
        'application/pdf': ['.pdf'],
      },
    },
    component: RHFDropzonePreviewAllTypes,
    md: 12,
  },
];
