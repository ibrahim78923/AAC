import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { getSession } from '@/utils';
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

export const dealsTasksDataArray = ({ data, usersData }: any) => {
  const { user }: { user: any } = getSession();
  return [
    {
      md: 12,
      componentProps: {
        placeholder: 'Enter Name',
        label: 'Task Name',
        name: 'name',
        required: true,
      },
      component: RHFTextField,
    },
    {
      md: 8,
      componentProps: {
        label: 'Task Type',
        name: 'type',
        select: true,
        required: true,
        placeholder: 'Enter Name',
      },
      options: [
        { label: 'Call', value: 'Call' },
        { label: 'Email', value: 'Email' },
      ],
      component: RHFSelect,
    },
    {
      md: 4,
      componentProps: {
        label: 'Priority',
        name: 'priority',
        select: true,
        required: true,
      },
      options: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
      ],
      component: RHFSelect,
    },
    {
      md: 12,
      componentProps: {
        label: 'Task Status',
        name: 'status',
        select: true,
      },
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Inprogress', value: 'Inprogress' },
        { label: 'Complete', value: 'Complete' },
      ],
      component: RHFSelect,
    },
    {
      md: 12,
      componentProps: {
        label: 'Associate with records',
        name: '',
        data: data,
      },
      component: SearchableTabsSelect,
    },
    {
      md: 12,
      componentProps: {
        label: 'Assigned to',
        name: 'assignTo',
        placeholder: 'Select option',
        apiQuery: usersData,
        externalParams: {
          organization: user?.organization?._id,
          limit: 50,
          role: user?.role,
        },
        getOptionLabel: (option: any) =>
          option?.firstName + ' ' + option?.lastName,
      },
      component: RHFAutocompleteAsync,
    },
    {
      md: 7,
      componentProps: {
        label: 'Due date',
        name: 'dueDate',
        select: true,
      },
      component: RHFDatePicker,
    },
    {
      md: 5,
      componentProps: {
        label: 'Time',
        name: 'time',
      },
      component: RHFTimePicker,
    },
    {
      md: 12,
      componentProps: {
        label: 'Reminder',
        name: 'reminder',
        select: true,
      },
      options: [
        { label: 'Today', value: 'Today' },
        { label: 'Tomorrow', value: 'Tomorrow' },
        { label: 'In 1 business day', value: 'in1businessday' },
        { label: 'In 2 business day', value: 'in2businessday' },
      ],
      component: RHFSelect,
    },
    {
      md: 12,
      componentProps: {
        label: 'Note',
        name: 'note',
      },
      component: RHFEditor,
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
