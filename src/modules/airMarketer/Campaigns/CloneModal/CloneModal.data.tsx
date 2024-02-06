import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  completedClone: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  completedClone: '',
};

export const dataArrayFeatures = [
  {
    componentProps: {
      name: 'completedClone',
      label: 'Name',
      placeholder: 'Enter name',
      required: true,
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
