import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const ExportFormValidationSchema = Yup.object().shape({
  Name: Yup?.string()?.trim()?.required('Field is Required'),
  email: Yup?.string()?.trim()?.required('Field is Required'),
  checkbox: Yup?.string()?.trim()?.required('Field is Required'),
});

export const ExportFormDefaultValues = {
  Name: '',
  email: '',
  checkbox: '',
};

export const ExportFormArray = [
  {
    componentProps: {
      name: 'Name',
      label: 'Name',
      fullWidth: true,
      placeholder: 'Forms: Sign up loyalty program',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'checkbox',
      label: 'Would you like to email the export results?',
      sx: { mb: 4 },
    },
    component: RHFCheckbox,
    md: 12,
  },
  {
    componentProps: {
      name: 'email',
      label: 'Email adresses',
      fullWidth: true,
      placeholder: 'Email',
    },
    component: RHFTextField,
    md: 12,
  },
];
