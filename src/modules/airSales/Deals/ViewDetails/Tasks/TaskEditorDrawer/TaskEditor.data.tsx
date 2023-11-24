import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealsTasksValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  type: Yup?.string()?.trim()?.required('Field is Required'),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
  status: Yup?.string()?.trim()?.required('Field is Required'),
  deal: Yup?.string()?.trim()?.required('Field is Required'),
  assignto: Yup?.string()?.trim()?.required('Field is Required'),
  associate: Yup?.string()?.trim()?.required('Field is Required'),
  reminder: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string()?.trim()?.required('Field is Required'),
});

export const dealsTasksDefaultValues = {
  name: '',
  type: '',
  priority: '',
  status: '',
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
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'type',
      label: 'Task Type',
      select: true,
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
    ],
    component: RHFSelect,
    md: 8,
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
    md: 4,
  },
  {
    componentProps: {
      name: 'status',
      label: 'Task Status',
      select: true,
    },
    options: [
      { value: 'Pending', label: 'Pending' },
      { value: 'Inprogress', label: 'Inprogress' },
      { value: 'Completed', label: 'Completed' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'deal',
      label: 'Select Deal',
      select: true,
      disabled: true,
    },
    options: [{ value: '655b2b2ecd318b576d7d71e8', label: 'Deal name' }],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'associate',
      label: 'Associate with Records',
      select: true,
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
      name: 'dueDate',
      label: 'Due Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
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
      { value: 'In 1 business Day', label: 'In 1 business Day' },
      { value: 'In 2 business Day', label: 'In 2 business Day' },
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
