import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  featureDetails: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  featureDetails: '',
};

export const dataArrayFeatures = [
  {
    componentProps: {
      name: 'featureDetails',
      label: 'Enter Details',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
