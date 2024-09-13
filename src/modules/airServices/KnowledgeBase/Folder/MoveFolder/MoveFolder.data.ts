import { RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import * as Yup from 'yup';
import { MoveFolderFormDefaultValuesI } from './MoveFolder.interface';
import { FoldersFields } from '../../KnowledgeBaseFormFields';

export const moveFolderValidationSchema = Yup?.object()?.shape({
  movingFrom: Yup?.string()?.trim()?.required('Folder name is required'),
  folder: Yup?.mixed()?.nullable()?.required('Folder name is required'),
});

export const moveFolderDefaultValues = (
  data?: MoveFolderFormDefaultValuesI,
) => {
  return {
    movingFrom: data?.[ARRAY_INDEX?.ZERO]?.folder?.name ?? '',
    folder: null,
  };
};

export const moveFolderFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'movingFrom',
      label: 'Moving From',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      label: 'Move To',
    },
    component: FoldersFields,
    md: 12,
  },
];
