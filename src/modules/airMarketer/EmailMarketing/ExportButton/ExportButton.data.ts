import { RHFRadioGroup, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const exportButtonValidationSchema = Yup?.object()?.shape({
  attribute: Yup?.string(),
  description: Yup?.string()?.trim()?.max(100, 'maximum 100 characters only'),
});

export const exportButtonFormFields = [
  {
    componentProps: {
      name: 'fileFormat',
      label: 'File format',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'csv', label: 'CSV' },
      { value: 'xls', label: 'XLS' },
      { value: 'xlsx', label: 'XLSX' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'radio',
      row: false,
      fullWidth: true,
      options: [
        { value: 'all', label: 'All emails' },
        { value: 'emails', label: 'Emails sent within a custom date range' },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];

export const exportButtonDefaultValue = {};
