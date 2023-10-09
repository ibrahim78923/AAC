import { RHFEditor, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addOutcomeValidation = Yup.object().shape({
  addOutcome: Yup.string().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
});

export const addOutcomeDefaultValues = {
  addOutcome: '',
  description: '',
};

export const addOutcomeArray = [
  {
    componentProps: {
      name: 'addOutcome',
      label: 'Add outcome',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'Interested', label: 'Interested' },
      { value: 'Left message', label: 'Left message' },
      { value: 'No response', label: 'No response' },
      { value: 'No interested', label: 'No interested' },
      { value: 'Not able to reach', label: 'Not able to reach' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
    mb: '12px',
  },
];
