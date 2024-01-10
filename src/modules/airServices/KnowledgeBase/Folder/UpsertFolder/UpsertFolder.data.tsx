import * as Yup from 'yup';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const upsertValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  description: Yup?.string()?.required('Field is Required'),
  visibility: Yup?.string()?.trim()?.required('Field is Required'),
});

export const upsertDefaultValues = {
  name: '',
  description: '',
  visibility: '',
};

export const upsertDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Folder Name',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: false,
      required: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: '#example',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: false,
      required: false,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'visibility',
      label: 'Visible to',
      type: 'text',
      size: 'small',
      fullWidth: true,
      select: true,
      required: false,
      options: ['ALL', 'ONLY_ME'],
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
