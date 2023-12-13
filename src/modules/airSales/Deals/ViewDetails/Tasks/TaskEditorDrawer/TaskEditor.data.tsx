import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealsTasksValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  type: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
  status: Yup?.string()?.required('Field is Required'),
  deal: Yup?.string()?.required('Field is Required'),
  // assignto: Yup?.string()?.required('Field is Required'),
  associate: Yup?.string()?.trim()?.required('Field is Required'),
  reminder: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string()?.required('Field is Required'),
});

export const dealsTasksDefaultValues = {
  name: '',
  type: '',
  priority: '',
  status: '',
  // TODO: Temporary id will come from backend
  deal: '655b2b2ecd318b576d7d71e8',
  assignto: '',
  associate: '',
  reminder: '',
  note: '',
  dueDate: null,
};

export const dealsTasksDataArray = [
  {
    componentProps: {
      name: 'name',
      label: 'Task Name',
      fullWidth: true,
      placeholder: 'Task Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'type',
      label: 'Task Type',
      required: true,
    },
    options: [
      { value: 'Call', label: 'Call' },
      { value: 'Email', label: 'Email' },
    ],
    component: RHFSelect,
    md: 8,
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
    md: 4,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Task Status',
    },
    options: [
      { value: 'Pending', label: 'Pending' },
      { value: 'Inprogress', label: 'Inprogress' },
      { value: 'Complete', label: 'Complete' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'deal',
      label: 'Select Deal',
      disabled: true,
      required: true,
    },
    // todo: array come from backend
    options: [{ value: '655b2b2ecd318b576d7d71e8', label: 'Deal name' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'associate',
      label: 'Associate with Records',
    },
    options: [
      { value: 'Companies', label: 'Companies' },
      { value: 'Contacts', label: 'Contacts' },
      { value: 'Deals', label: 'Deals' },
      { value: 'Tickets', label: 'Tickets' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'assignto',
      label: 'Assigned to',
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
      name: 'dueDate',
      label: 'Due Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    format: (date: any) => {
      return new Date(date);
    },
    md: 12,
  },

  {
    componentProps: {
      name: 'reminder',
      label: 'Reminder',
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

  {
    componentProps: {
      name: 'note',
      label: 'Note',
      fullWidth: true,
    },
    component: RHFEditor,
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
