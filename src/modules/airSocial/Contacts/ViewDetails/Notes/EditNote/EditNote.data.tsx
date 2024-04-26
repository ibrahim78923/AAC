import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';

export const editDefaultValues = {
  title: '',
  description: '',
  attachment: '',
};

export const editNoteFields = () => {
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
