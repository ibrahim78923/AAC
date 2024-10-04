import * as Yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { UpsertFolderFormDefaultValuesI } from './UpsertFolder.interface';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CHARACTERS_LIMIT } from '@/constants/validation';

const {
  SERVICES_KNOWLEDGE_BASE_FOLDER_NAME_MAX_CHARACTERS,
  SERVICES_KNOWLEDGE_BASE_FOLDER_DESCRIPTION_MAX_CHARACTERS,
} = CHARACTERS_LIMIT ?? {};

export const FOLDER_VISIBILITY = {
  ALL: 'ALL',
  ONLY_ME: 'ONLY_ME',
};

const { ALL, ONLY_ME } = FOLDER_VISIBILITY ?? {};

export const folderVisibilityOptions: AutocompleteOptionsI[] = [
  {
    _id: ALL,
    label: 'All',
  },
  {
    _id: ONLY_ME,
    label: 'Only me',
  },
];

export const upsertFolderValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()
    ?.trim()
    ?.required('Name is required')
    ?.max(
      SERVICES_KNOWLEDGE_BASE_FOLDER_NAME_MAX_CHARACTERS,
      `Maximum characters limit is ${SERVICES_KNOWLEDGE_BASE_FOLDER_NAME_MAX_CHARACTERS}`,
    ),
  description: Yup?.string()
    ?.trim()
    ?.max(
      SERVICES_KNOWLEDGE_BASE_FOLDER_DESCRIPTION_MAX_CHARACTERS,
      `Maximum characters limit is ${SERVICES_KNOWLEDGE_BASE_FOLDER_DESCRIPTION_MAX_CHARACTERS}`,
    ),
  visibility: Yup?.mixed()?.nullable()?.required('Visibility is required'),
});

export const upsertFolderFormDefaultValues = (
  data?: UpsertFolderFormDefaultValuesI,
) => {
  return {
    name: data?.name ?? '',
    description: data?.description ?? '',
    visibility: !!data?.visibility
      ? { _id: data?.visibility, label: data?.visibility }
      : null,
  };
};

export const upsertFolderFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter folder name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Write the description',
      fullWidth: true,
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'visibility',
      label: 'Visible to',
      placeholder: 'Select the visibility',
      fullWidth: true,
      required: true,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
      options: folderVisibilityOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
