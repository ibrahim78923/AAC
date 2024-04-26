import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const editCallValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  contactOwnerId: Yup?.string()?.trim()?.required('Field is Required'),
  // assignee: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string()?.trim()?.required('Field is Required'),
});

export const editCallDefaultValues = {};

export const editCallFormData = (
  contactOwners: any,
  isFieldDisabled: boolean,
) => {
  return [
    {
      id: 'title',
      componentProps: {
        name: 'title',
        label: 'Title',
        fullWidth: true,
        required: true,
        disabled: isFieldDisabled,
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
        disabled: isFieldDisabled,
      },
      component: RHFDatePicker,
      md: 6,
    },
    {
      id: 'startTime',
      componentProps: {
        name: 'startTime',
        label: 'Start Time',
        fullWidth: true,
        disabled: isFieldDisabled,
      },
      component: RHFTimePicker,
      md: 6,
    },
    {
      id: 'endDate',
      componentProps: {
        name: 'endDate',
        label: '  End Date',
        fullWidth: true,
        required: true,
        disabled: isFieldDisabled,
      },
      component: RHFDatePicker,
      md: 6,
    },
    {
      id: 'endTime',
      componentProps: {
        name: 'endTime',
        label: 'End Time',
        fullWidth: true,
        disabled: isFieldDisabled,
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
        disabled: isFieldDisabled,
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
