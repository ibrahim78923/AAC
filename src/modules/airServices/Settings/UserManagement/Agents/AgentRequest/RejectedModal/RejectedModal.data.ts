import { RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const validationSchemaRejectedModal = Yup?.object()?.shape({
  rejected: Yup?.string()?.required('Field is Required'),
});

export const defaultValuesRejectedModal = {
  rejected: '',
};

export const rejectedModalField = [
  {
    id: 1,
    componentProps: {
      name: 'rejected',
      multiline: true,
      fullWidth: true,
      minRows: 4,
      placeholder: 'Add Your Remarks here',
      label: 'Reason For Rejection',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
];
