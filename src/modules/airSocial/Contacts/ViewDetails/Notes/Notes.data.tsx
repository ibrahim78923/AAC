import {
  RHFEditor,
  RHFTextField,
  RHFDropzonePreviewAllTypes,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addNoteValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
});

export const addNoteDefaultValues = {
  title: '',
  description: '',
  attachment: '',
};

export const addNoteFields = (disabled: boolean = false) => {
  return [
    {
      id: 'title',
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
        required: true,
        disabled: disabled,
      },
      component: RHFTextField,
      md: 12,
    },

    {
      id: 'description',
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        required: true,
        disabled: disabled,
      },
      component: RHFEditor,
      md: 12,
    },
    {
      id: 'attachment',
      componentProps: {
        name: 'attachment',
        label: 'Attachment',
        fullWidth: true,
        disabled: disabled,
      },
      component: RHFDropzonePreviewAllTypes,
      md: 12,
    },
  ];
};
