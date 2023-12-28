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
  note: Yup?.string()?.trim()?.required('Field is Required'),
  type: Yup?.string()?.trim()?.required('Field is Required'),
  dueDate: Yup?.string()?.trim()?.required('Field is Required'),
  createTime: Yup?.string()?.trim()?.required('Field is Required'),
  assignedto: Yup?.string()?.trim()?.required('Field is Required'),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
  NotifyBefore: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dealsTasksDefaultValues = {
  name: '',
  note: '',
  type: '',
  dueDate: '',
  createTime: '',
  assignedto: '',
  priority: '',
  NotifyBefore: '',
};

export const dealsTasksDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Title',
      fullWidth: true,
      required: true,
      placeholder: 'Title Here',
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'note',
      label: 'Description',
      fullWidth: true,
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
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
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
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'createTime',
      label: 'Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'assignedto',
      label: 'Assign To',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Alfa Bravo', label: 'Alfa Bravo' },
      { value: 'John Charlie', label: 'John Charlie' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      select: true,
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
      name: 'NotifyBefore',
      label: 'Notify Before',
      select: true,
    },
    options: [
      { value: 'Today', label: 'Today' },
      { value: 'Tomorrow', label: 'Tomorrow' },
      { value: 'In 1 business Day', label: 'In 1 business Day' },
      { value: 'In 2 business Day', label: 'In 2 business Day' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const drawerTitle: any = {
  Add: 'Add Tasks',
  Edit: 'Edit Tasks',
  View: 'View Tasks',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
