import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaSaveEmailAsTemplate = Yup?.object()?.shape({
  templateTitle: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesSaveEmailAsTemplate = {
  templateTitle: '',
};

export const dataArraySaveEmailAsTemplate = [
  {
    componentProps: {
      name: 'templateTitle',
      label: 'Template Title  ',
      fullWidth: true,
      isCheckBox: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
