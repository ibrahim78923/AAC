import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dealsTasksValidationSchema = Yup.object().shape({
  taskname: Yup.string().trim().required('Field is Required'),
  tasktype: Yup.string().trim().required('Field is Required'),
  priority: Yup.string().trim().required('Field is Required'),
  taskstatus: Yup.string().trim().required('Field is Required'),
  selectdeal: Yup.string().trim().required('Field is Required'),
  assignedto: Yup.string().trim().required('Field is Required'),
  associatewithrecords: Yup.string().trim().required('Field is Required'),
  reminder: Yup.string().trim().required('Field is Required'),
  note: Yup.string().trim().required('Field is Required'),
});

export const dealsTasksDefaultValues = {
  taskname: '',
  tasktype: '',
  priority: '',
  taskstatus: '',
  selectdeal: '',
  assignedto: '',
  associatewithrecords: '',
  reminder: '',
  note: '',
};

export const dealsTasksDataArray = [
  {
    componentProps: {
      name: 'taskname',
      label: 'Task Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    componentProps: {
      name: 'tasktype',
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
      name: 'taskstatus',
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
      name: 'selectdeal',
      label: 'Select Deal',
      disable: true,
    },
    options: [],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'associatewithrecords',
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
      name: 'assignedto',
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
      name: 'due-date',
      label: 'Due Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 8,
  },
  {
    componentProps: {
      name: 'create-time',
      label: '',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 4,
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
