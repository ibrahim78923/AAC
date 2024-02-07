import * as Yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const upsertValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
  visibility: Yup?.mixed()?.nullable()?.required('Field is Required'),
});

export const upsertDefaultValues = {
  name: '',
  description: '',
  visibility: null,
};

export const upsertDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Folder Name',
      fullWidth: true,
      required: false,
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
      required: false,
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
      required: false,
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
