import { RHFEditor, RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertFolderValidationSchema = Yup.object().shape({
  name: Yup.string().required('Field is Required'),
  description: Yup.string(),
  visible: Yup.string().trim().required('Field is Required'),
});

export const upsertFolderDefaultValues = {
  name: '',
  description: '',
  visible: '',
};

export const upsertFolderDataArray = [
  {
    label: 'Name',
    componentProps: {
      name: 'name',
      placeholder: 'Enter Folder Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    label: 'Description',
    componentProps: {
      name: 'description',
      placeholder: '#example',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },

  {
    label: 'Visible to',
    componentProps: {
      name: 'visible',
      placeholder: 'All',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'All', label: 'All' },
      { value: 'Only to you', label: 'Only to you' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
