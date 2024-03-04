import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const contactTaskValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Field is Required'),
  status: Yup?.string()?.trim()?.required('Field is Required'),
});

export const contactTaskDefaultValues = {
  title: '',
  description: '',
  status: '',
  startDate: null,
  endDate: null,
  assignTo: '',
  priority: '',
  notifyBefore: '',
};

export const contactTaskDataArray = [
  {
    id: 'title',
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
    },
  },
  {
    id: 'description',
    md: 12,
    component: RHFEditor,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
  },
  {
    id: 'status',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'status',
      label: 'Task Type',
      select: true,
    },
    options: [
      { value: 'To-do', label: 'To-do' },
      { value: 'Follow-up', label: 'Follow-up' },
      { value: 'Call reminder', label: 'Call reminder' },
    ],
  },
  {
    id: 'startDate',
    md: 6,
    component: RHFDatePicker,
    componentProps: {
      name: 'startDate',
      label: 'Start Date',
      fullWidth: true,
    },
  },
  {
    id: 'endDate',
    md: 6,
    component: RHFDatePicker,
    componentProps: {
      name: 'endDate',
      label: 'End Date',
      fullWidth: true,
    },
  },
  {
    id: 'assignTo',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'assignTo',
      label: 'Assign To',
      select: true,
    },
    options: [
      { value: 'Companies', label: 'Companies' },
      { value: 'Contacts', label: 'Contacts' },
      { value: 'Deals', label: 'Deals' },
      { value: 'Tickets', label: 'Tickets' },
    ],
  },
  {
    id: 'priority',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'priority',
      label: 'Priority',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Alfa Bravo', label: 'Alfa Bravo' },
      { value: 'John Charlie', label: 'John Charlie' },
    ],
  },

  {
    id: 'notifyBefore',
    md: 12,
    component: RHFSelect,
    componentProps: {
      name: 'notifyBefore',
      label: 'Notify Before',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Alfa Bravo', label: 'Alfa Bravo' },
      { value: 'John Charlie', label: 'John Charlie' },
    ],
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
