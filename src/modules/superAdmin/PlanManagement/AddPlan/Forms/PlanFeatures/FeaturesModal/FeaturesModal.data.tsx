import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaFeatures = Yup.object().shape({
  dealsAssociationsDetail: Yup.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesFeatures = {
  dealsAssociationsDetail: '',
};

export const dataArrayFeatures = [
  {
    componentProps: {
      name: 'dealsAssociationsDetail',
      label: 'Enter Details',
      fullWidth: true,
    },

    component: RHFTextField,

    md: 12,
  },
];
