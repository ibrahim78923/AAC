import { RHFAutocomplete } from '@/components/ReactHookForm';
import * as Yup from 'yup';

const statusOptions = ['Enabled', 'Disabled', 'Draft'];
const createdByOptions = ['Jane Cooper', 'Esther Howard'];
export const filterWorkflowsValidationSchema = Yup?.object()?.shape({
  status: Yup?.string().required('Required'),
  createdBy: Yup?.string().required('Required'),
});

export const defaultValues = {
  status: '',
  createdBy: '',
};

export const filterWorkflowsDataFields = [
  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      required: true,
      placeholder: 'Select',
      options: statusOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdBy',
      label: 'Created By',
      fullWidth: true,
      required: true,
      placeholder: 'Select',
      options: createdByOptions,
    },
    component: RHFAutocomplete,
    md: 12,
  },
];
