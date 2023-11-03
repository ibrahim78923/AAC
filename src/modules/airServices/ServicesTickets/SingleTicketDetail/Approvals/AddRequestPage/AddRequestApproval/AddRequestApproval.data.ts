import { RHFTextField, RHFEditor } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addRequestApprovalValidationSchema = Yup?.object()?.shape({
  subject: Yup?.string()
    ?.trim()
    ?.required('Field is Required')
    ?.email('Invalid email address'),
  description: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  subject: '',
  description: '',
};

export const addRequestApprovalDataArray = [
  {
    componentProps: {
      name: 'subject',
      label: 'To',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
