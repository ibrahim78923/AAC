import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addCallValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  contactOwnerId: Yup?.string()?.trim()?.required('Field is Required'),
  // assignee: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string()?.trim()?.required('Field is Required'),
});

export const addCallDefaultValues = {};

export const addCallFormData = (contactOwners: any) => {
  return [
    {
      id: 'title',
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 12,
    },
    {
      id: 'startDate',
      componentProps: {
        name: 'startDate',
        label: 'Start Date',
        fullWidth: true,
        required: true,
      },
      component: RHFDatePicker,
      md: 6,
    },
    {
      id: 'starttime',
      componentProps: {
        name: 'starttime',
        label: 'Start Time',
        fullWidth: true,
      },
      component: RHFTimePicker,
      md: 6,
    },
    {
      id: 'enddate',
      componentProps: {
        name: 'endDate',
        label: '  End Date',
        fullWidth: true,
        required: true,
      },
      component: RHFDatePicker,
      md: 6,
    },
    {
      id: 'endtime',
      componentProps: {
        name: 'endTime',
        label: 'End Time',
        fullWidth: true,
      },
      component: RHFTimePicker,
      md: 6,
    },
    {
      id: 'contactOwnerId',
      componentProps: {
        name: 'contactOwnerId',
        label: 'Owner',
        fullWidth: true,
        select: true,
        required: true,
      },
      options: contactOwners,
      component: RHFSelect,
      md: 12,
    },
  ];
};

export const drawerTitle: any = {
  Add: 'Add Calls',
  Edit: 'Edit Calls',
  View: 'View Calls',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};

export const options = [
  { value: 'Interested', label: 'Interested' },
  { value: 'Left message', label: 'Left message' },
  { value: 'No response', label: 'No response' },
  { value: 'No interested', label: 'No interested' },
  { value: 'No able to reach', label: 'No able to reach' },
  { value: 'Others', label: 'Others' },
];
