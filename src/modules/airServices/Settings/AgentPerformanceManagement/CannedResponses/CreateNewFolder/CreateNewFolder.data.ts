import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const createNewFolderSchema = Yup?.object()?.shape({
  folderName: Yup?.string()
    ?.required('Folder Name is required')
    ?.min(3, 'Folder Name must be at least 3 characters')
    ?.max(30, 'Folder Name must not exceed 30 characters'),
  description: Yup?.string()?.required('Description is required'),
});
export const createNewFolderDefaultValues = {
  folderName: '',
  description: '',
};

export const createNewFolderArray = [
  {
    componentProps: {
      name: 'folderName',
      label: 'Folder Name',
      size: 'small',
      required: true,
    },
    component: RHFTextField,
    md: 12,
    id: 1,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      size: 'small',
      multiline: true,
      rows: 3,
    },
    component: RHFTextField,
    mb: '12px',
    id: 2,
  },
];
