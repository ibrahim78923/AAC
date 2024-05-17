import { RHFRadioGroup } from '@/components/ReactHookForm';

import * as Yup from 'yup';
export const exportAsValidationSchema = Yup?.object()?.shape({
  exportAs: Yup?.string(),
});
export const exportAsDefaultValues = {
  exportAs: '',
};

export const exportAsData = [
  {
    id: 1,
    componentProps: {
      name: 'exportAs',
      fullWidth: true,
      defaultValue: 'all',
      options: [
        {
          value: 'csv',
          label: 'CSV',
        },
        {
          value: 'excel',
          label: 'Excel',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
];

export const selectedFieldsData = [
  { _id: 1, value: 'callId', label: 'CALL ID' },
  { _id: 2, value: 'waitTime', label: 'Wait Time' },
  { _id: 3, value: 'customerName', label: 'Customer Name' },
  { _id: 4, value: 'direction', label: 'Direction' },
  { _id: 5, value: 'callTags', label: 'Call Tags' },
];
