import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { FoldersFields } from '../../KnowledgeBaseFormFields';

export const moveFolderValidationSchema = Yup?.object()?.shape({
  movingFrom: Yup?.string()?.trim()?.required('Folder name is required'),
  folder: Yup?.mixed()?.nullable()?.required('Folder name is required'),
});

export const moveFolderDefaultValues = (currentFolderName?: string) => {
  return {
    movingFrom: currentFolderName ?? '',
    folder: null,
  };
};

export const moveFolderFormFieldsDynamic = () => [
  {
    _id: 1,
    componentProps: {
      name: 'movingFrom',
      label: 'Moving From',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    _id: 2,
    componentProps: {
      label: 'Move To',
    },
    component: FoldersFields,
  },
];
