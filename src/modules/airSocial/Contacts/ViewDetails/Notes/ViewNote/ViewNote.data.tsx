import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';

export const viewDefaultValues = {
  title: '',
  description: '',
  attachment: '',
};

export const viewNoteFields = () => {
  return [
    {
      id: 'title',
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
        disabled: true,
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
        disabled: true,
      },
      component: RHFEditor,
      md: 12,
    },
  ];
};
