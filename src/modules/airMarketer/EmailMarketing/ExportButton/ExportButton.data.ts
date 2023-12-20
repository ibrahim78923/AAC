import { RHFDateRangePicker, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const exportButtonValidationSchema = Yup?.object()?.shape({
  attribute: Yup?.string(),
  description: Yup?.string()?.trim()?.max(100, 'maximum 100 characters only'),
});

export const exportButtonFormFields = [
  {
    id: 10,
    componentProps: {
      name: 'percentageOff',
      label: 'Percentage Off',
      placeholder: '',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 11,
    componentProps: {
      name: 'flatOff',
      label: 'Flat off (on entire purchase)',
      placeholder: '',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 7,
    componentProps: {
      name: 'accountCreatedIn',
      label: 'Account created in',
      placeholder: 'Select',
    },
    component: RHFDateRangePicker,
    md: 12,
  },
];

export const exportButtonDefaultValue = {};
