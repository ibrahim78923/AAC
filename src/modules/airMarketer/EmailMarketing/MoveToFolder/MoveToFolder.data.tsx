import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaMoveToFolder = Yup?.object()?.shape({
  chooseFolder: Yup?.mixed()?.nullable()?.required('Requester is required'),
});

export const defaultValuesMoveToFolder = {
  chooseFolder: null,
};

export const dataArrayMoveToFolder = (apiQueryFolders?: any) => {
  return [
    {
      id: 51,
      componentProps: {
        fullWidth: true,
        name: 'chooseFolder',
        label: 'Folder',
        placeholder: 'Choose folder',
        getOptionLabel: (option: any) => `${option?.name} `,
        renderOption: (option: any) => `${option?.name}`,
        apiQuery: apiQueryFolders,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};
