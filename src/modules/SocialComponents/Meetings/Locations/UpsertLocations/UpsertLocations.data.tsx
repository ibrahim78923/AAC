import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const upsertLocationsFormValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required'),
  destination: Yup?.string(),
  description: Yup?.string(),
});

export const upsertLocationsDefaultValues = {
  namer: '',
  destination: '',
  description: '',
};

export const upsertFormFields = [
  {
    componentProps: {
      name: 'name',
      label: 'Location Name',
      fullWidth: true,
      required: true,
      placeholder: 'Add Location Name',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'destination',
      label: 'Destination',
      fullWidth: true,
      placeholder: 'Enter Destination',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      placeholder: 'Type',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
    md: 12,
  },
];
