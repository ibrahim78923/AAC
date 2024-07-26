import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dealsNotesValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
  attachfile: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dealsNotesDefaultValues = {
  title: '',
  description: '',
  attachfile: '',
};

export const dealsNotesDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Task Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachfile',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add Notes',
  Edit: 'Edit Notes',
  View: 'View Notes',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
