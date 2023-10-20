import { RHFDropZone } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const AttachmentsValidation = Yup.object().shape({
  file: Yup.mixed().required('Field is Required'),
});

export const AttachmentsDefaultValues = {
  file: '', //3
};

export const UploadAttachmentsArray = [
  {
    componentProps: {
      name: 'selectafileordraganddrophereFile',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
