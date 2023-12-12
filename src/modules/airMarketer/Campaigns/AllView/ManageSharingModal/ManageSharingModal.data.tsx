import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  name: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  name: '',
};

export const dataArraySavedView = [
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      fullWidth: true,
      required: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
