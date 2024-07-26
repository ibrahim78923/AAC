import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const dealsTasksValidationSchema = Yup?.object()?.shape({
  taskname: Yup?.string()?.trim()?.required('Field is Required'),
  tasktype: Yup?.string()?.trim()?.required('Field is Required'),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
  taskstatus: Yup?.string()?.trim()?.required('Field is Required'),
  selectdeal: Yup?.string()?.trim()?.required('Field is Required'),
  assignedto: Yup?.string()?.trim()?.required('Field is Required'),
  associatewithrecords: Yup?.string()?.trim()?.required('Field is Required'),
  reminder: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string()?.trim()?.required('Field is Required'),
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

export const ContactsTasksDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
    },
    component: RHFTextField,
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
      name: 'taskstatus',
      label: '2:56',
      select: false,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'Assign To',
      label: 'Assign To',
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
      name: 'Priority',
      label: 'Priority',
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
      name: 'Notify Before',
      label: 'Notify Before',
      fullWidth: true,
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
];

export const drawerTitle: any = {
  Add: 'Add New Tasks',
  Edit: 'Edit Tasks',
  View: 'View Tasks',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
