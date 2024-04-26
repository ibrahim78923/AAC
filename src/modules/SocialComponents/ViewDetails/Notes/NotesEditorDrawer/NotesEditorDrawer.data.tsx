import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dealsNotesValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dealsNotesDefaultValues = {
  title: '',
  description: '',
  file: '',
};

export const dealsNotesDataArray = (openDrawer: any) => {
  return [
    {
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
        placeholder: 'Title here',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },

    {
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFEditor,
      md: 12,
    },
    {
      componentProps: {
        name: 'file',
        label: '',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFDropZone,
      md: 12,
    },
  ];
};
export const drawerTitle: any = {
  Add: 'Add Notes',
  Edit: 'Edit Notes',
  View: 'View Notes',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
