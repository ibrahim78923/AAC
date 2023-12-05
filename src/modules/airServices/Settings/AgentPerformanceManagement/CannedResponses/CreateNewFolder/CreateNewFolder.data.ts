import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const createNewFolderSchema = Yup?.object()?.shape({
  folderName: Yup?.string()
    ?.required('Required')
    ?.min(3, 'At least 3 characters Required')
    ?.max(30, 'Must not exceed 30 characters'),
  description: Yup?.string()?.required('Required'),
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
    id: 2,
  },
];
