import { RHFRadioGroup, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const reportsValidationSchema: any = Yup?.object()?.shape({
  reportName: Yup?.string()?.required('Report Name is Required'),
  description: Yup?.string()?.required('Description is Required'),
});
export const reportsDefaultValues = {
  reportName: '',
  description: '',
};

export const reportsDataArray = () => {
  return [
    {
      md: 12,
      componentProps: {
        name: 'reportName',
        label: 'Report Name',
        placeholder: 'Enter Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
    },
    {
      md: 12,
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        multiline: true,
        rows: 4,
      },
      component: RHFTextField,
    },
    {
      componentProps: {
        name: 'sharedWith',
        label: 'Shared with',
        required: true,
        row: false,
        options: [
          { value: 'private', label: 'Private' },
          { value: 'everyone', label: 'Everyone' },
          { value: 'specificUsers', label: 'Specific Users' },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
    {
      componentProps: {
        name: 'addToDashboard',
        label: 'Add this report to a dashboard',
        row: false,
        options: [
          { value: 'doNotAdd', label: 'Do not add to a dashboard' },
          { value: 'addTo', label: 'Add to existing dashboard' },
          { value: 'addToNew', label: 'Add to new dashboard' },
        ],
      },
      component: RHFRadioGroup,
      md: 12,
    },
  ];
};
