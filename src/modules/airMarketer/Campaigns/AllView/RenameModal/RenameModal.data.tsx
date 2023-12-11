import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  rename: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  rename: '',
};

export const dataArrayRename = [
  {
    componentProps: {
      name: 'rename',
      label: 'Rename',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
