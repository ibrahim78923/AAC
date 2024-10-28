import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealsTasksValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string(),
  type: Yup?.string()?.trim()?.required('Field is Required'),
  dueDate: Yup?.mixed()?.nullable(),
  createTime: Yup?.mixed()?.nullable(),
  assignTo: Yup?.string(),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
  reminder: Yup?.string(),
});

export const dealsTasksDefaultValues = {
  name: '',
  note: '',
  type: '',
  dueDate: null,
  createTime: null,
  assignTo: '',
  priority: '',
  reminder: '',
};

export const dealsTasksDataArray = (openDrawer: any, contactsList: any) => {
  return [
    {
      componentProps: {
        name: 'name',
        label: 'Title',
        fullWidth: true,
        required: true,
        placeholder: 'Title Here',
        disabled: openDrawer === 'View',
      },
      component: RHFTextField,
      md: 12,
    },
    {
      componentProps: {
        name: 'note',
        label: 'Description',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFEditor,
      md: 12,
    },
    {
      componentProps: {
        name: 'type',
        label: 'Task Type',
        select: true,
        required: true,
        disabled: openDrawer === 'View',
      },
      options: [
        { value: 'Call', label: 'Call' },
        { value: 'Email', label: 'Email' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'dueDate',
        label: 'Due Date',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFDatePicker,
      md: 6,
    },
    {
      componentProps: {
        name: 'createTime',
        label: 'Time',
        fullWidth: true,
        disabled: openDrawer === 'View',
      },
      component: RHFTimePicker,
      md: 6,
    },
    {
      componentProps: {
        name: 'assignTo',
        label: 'Assign To',
        select: true,
        disabled: openDrawer === 'View',
      },
      options: contactsList,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'priority',
        label: 'Priority',
        select: true,
        required: true,
        disabled: openDrawer === 'View',
      },
      options: [
        { value: '-', label: '-' },
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'reminder',
        label: 'Notify Before',
        select: true,
        disabled: openDrawer === 'View',
      },
      options: [
        { value: 'Today', label: 'Today' },
        { value: 'Tomorrow', label: 'Tomorrow' },
        { value: 'In_1_Business_Day', label: 'In 1 business Day' },
        { value: 'In_2_Business_Day', label: 'In 2 business Day' },
      ],
      component: RHFSelect,
      md: 12,
    },
  ];
};
export const drawerTitle: any = {
  Add: 'Add Tasks',
  Edit: 'Edit Tasks',
  View: 'View Tasks',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
