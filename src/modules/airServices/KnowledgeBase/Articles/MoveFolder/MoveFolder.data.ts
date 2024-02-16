import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const moveFolderValidationSchema = Yup?.object()?.shape({
  movingFrom: Yup?.string()?.required('Required'),
  moveTo: Yup?.mixed()?.nullable()?.required('Required'),
});

export const moveFolderDefaultValues = (data?: any) => {
  return {
    movingFrom: data?.folder?.name ?? '',
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
      placeholder: 'Training',
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
      apiQuery: apiQueryFolder,
    },
    component: RHFAutocompleteAsync,
    md: 12,
  },
];
