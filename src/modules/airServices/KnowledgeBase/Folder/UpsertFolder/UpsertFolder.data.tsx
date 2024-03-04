import * as Yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const upsertFolderValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Required'),
  description: Yup?.string(),
  visibility: Yup?.mixed()?.nullable()?.required('Required'),
});

export const upsertFolderFormDefaultValues = {
  name: '',
  description: '',
  visibility: null,
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
