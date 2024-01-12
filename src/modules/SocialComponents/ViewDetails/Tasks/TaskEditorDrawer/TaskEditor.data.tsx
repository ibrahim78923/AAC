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
  dueDate: Yup?.string(),
  createTime: Yup?.string(),
  assignTo: Yup?.string(),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
  reminder: Yup?.string(),
});

export const dealsTasksDefaultValues = {
  name: '',
  note: '',
  type: '',
  dueDate: '',
  createTime: '',
  assignTo: '',
  priority: '',
  reminder: '',
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
      { value: 'Call', label: 'Call' },
      { value: 'Company', label: 'Company' },
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
      name: 'assignTo',
      label: 'Assign To',
      select: true,
    },
    options: [
      { value: '65782638da7b3457092af1dd', label: 'John Doe' },
      { value: '65782638da7b3457092af1dd', label: 'Alfa Bravo' },
      { value: '65782638da7b3457092af1dd', label: 'John Charlie' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'priority',
      label: 'Priority',
      select: true,
      required: true,
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
    },
    options: [
      { value: 'Today', label: 'Today' },
      { value: 'Tomorrow', label: 'Tomorrow' },
      { value: 'in1businessday', label: 'In 1 business Day' },
      { value: 'in2businessday', label: 'In 2 business Day' },
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
