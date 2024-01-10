import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addNoteValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
  // attachment: Yup?.string()?.trim()?.required('Field is Required'),
});

export const addNoteDefaultValues = {
  title: '',
  description: '',
  attachment: '',
};

export const addNoteFields = () => {
  return [
    {
      id: 'title',
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
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
      },
      component: RHFEditor,
      md: 12,
    },
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
};
