import * as Yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const upsertFolderValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Name is required'),
  description: Yup?.string()?.trim(),
  visibility: Yup?.mixed()?.nullable()?.required('Visibility is required'),
});

export const upsertFolderFormDefaultValues = (data?: any) => {
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
      getOptionLabel: (option: any) => option?.label,
      options: [
        { _id: 'ALL', label: 'ALL' },
        { _id: 'ONLY_ME', label: 'ONLY_ME' },
      ],
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
