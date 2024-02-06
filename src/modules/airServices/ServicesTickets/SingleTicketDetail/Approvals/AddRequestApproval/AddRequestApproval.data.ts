import { RHFTextField, RHFEditor } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addRequestApprovalValidationSchema = Yup?.object()?.shape({
  subject: Yup?.string()
    ?.trim()
    ?.required('Required')
    ?.email('Invalid email address'),
  description: Yup?.string()?.required('Required'),
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
      style: { height: '150px' },
    },
    component: RHFEditor,
    md: 12,
  },
];
