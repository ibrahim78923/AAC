import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import * as Yup from 'yup';
import { MoveFolderFormDefaultValuesI } from './MoveFolder.interface';

export const moveFolderValidationSchema = Yup?.object()?.shape({
  movingFrom: Yup?.string()?.trim()?.required('Folder name is required'),
  moveTo: Yup?.mixed()?.nullable()?.required('Folder name is required'),
});

export const moveFolderDefaultValues = (
  data?: MoveFolderFormDefaultValuesI,
) => {
  return {
    movingFrom: data?.[ARRAY_INDEX?.ZERO]?.folder?.name ?? '',
    moveTo: null,
  };
};

export const moveFolderFormFieldsDynamic = (apiQueryFolder: any) => [
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
      name: 'moveTo',
      label: 'Move To',
      fullWidth: true,
      required: true,
      apiQuery: apiQueryFolder,
      placeholder: 'Select folder',
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
