import * as Yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { UpsertFolderFormDefaultValuesI } from './UpsertFolder.interface';
import { AutocompleteOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const FOLDER_VISIBILITY = {
  ALL: 'ALL',
  ONLY_ME: 'ONLY_ME',
};

export const folderVisibilityOptions: AutocompleteOptionsI[] = [
  {
    _id: FOLDER_VISIBILITY?.ALL,
    label: 'All',
  },
  {
    _id: FOLDER_VISIBILITY?.ONLY_ME,
    label: 'Only me',
  },
];

export const upsertFolderValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Name is required'),
  description: Yup?.string()?.trim(),
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
      placeholder: 'Enter Folder Name',
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
      placeholder: '#example',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 3,
    componentProps: {
      name: 'visibility',
      label: 'Visible to',
      fullWidth: true,
      required: true,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
      options: folderVisibilityOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
