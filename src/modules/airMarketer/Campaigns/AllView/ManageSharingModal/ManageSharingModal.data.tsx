import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  newSaveViewCopy: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  newSaveViewCopy: '',
};

export const dataArraySavedView = [
  {
    componentProps: {
      name: 'newSaveViewCopy',
      label: 'Name',
      fullWidth: true,
      require: true,
      placeholder: 'New save view copy',
    },

    component: RHFTextField,

    md: 12,
  },
];
