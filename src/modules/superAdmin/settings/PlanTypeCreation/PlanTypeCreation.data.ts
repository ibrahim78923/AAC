import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const planTypeCreationValidationSchema = Yup.object().shape({
  planTypeName: Yup.string().trim().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const planTypeCreationDefaultValues = {
  planTypeName: '',
  description: '',
};

export const planTypeCreationFiltersDataArray = [
  {
    componentProps: {
      name: 'planTypeName',
      label: 'Plan Type Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
