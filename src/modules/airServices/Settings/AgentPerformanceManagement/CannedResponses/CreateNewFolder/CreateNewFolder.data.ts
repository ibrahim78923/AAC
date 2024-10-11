import { RHFTextField } from '@/components/ReactHookForm';
import {
  CHARACTERS_LIMIT,
  GLOBAL_CHARACTERS_LIMIT,
} from '@/constants/validation';
import * as Yup from 'yup';

export const createNewFolderSchema = Yup?.object()?.shape({
  folderName: Yup?.string()
    ?.trim()
    ?.required('Folder Name is Required')
    ?.min(3, 'At least 3 characters Required')
    ?.max(
      CHARACTERS_LIMIT?.SERVICES_SETTINGS_CANNED_RESPONSES_FOLDER_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${CHARACTERS_LIMIT?.SERVICES_SETTINGS_CANNED_RESPONSES_FOLDER_NAME_MAX_CHARACTERS}`,
    ),
  description: Yup?.string()
    ?.trim()
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.DESCRIPTION}`,
    ),
});

export const upsertFolderDefaultValuesFunction: any = (data?: any) => {
  return {
    folderName: data?.folderName ?? '',
    description: data?.description ?? '',
  };
};

export const createNewFolderArray = [
  {
    id: 1,
    componentProps: {
      name: 'folderName',
      label: 'Folder Name',
      required: true,
      placeholder: 'Enter Name',
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      multiline: true,
      rows: 3,
      placeholder: 'Description',
    },
    component: RHFTextField,
  },
];
