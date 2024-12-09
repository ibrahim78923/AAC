import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const exportButtonValidationSchema = Yup?.object()?.shape({
  fileFormat: Yup?.string()?.trim()?.required('Field is Required'),
  // radio: Yup?.string()?.trim()?.required('Field is Required'),
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
      { value: 'CSV', label: 'CSV' },
      { value: 'XLS', label: 'XLS' },
    ],
    component: RHFSelect,
    md: 12,
  },
  // {
  //   componentProps: {
  //     name: 'radio',
  //     row: false,
  //     fullWidth: true,
  //     options: [
  //       { value: 'all', label: 'All emails' },
  //       { value: 'emails', label: 'Emails sent within a custom date range' },
  //     ],
  //   },
  //   component: RHFRadioGroup,
  //   md: 12,
  // },
];

export const exportButtonDefaultValue = {};
