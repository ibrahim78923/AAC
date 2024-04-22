import {
  RHFAutocompleteAsync,
  // RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { getSession } from '@/utils';
// import { getSession } from '@/utils';
import * as Yup from 'yup';

export const dealsTasksValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field is Required'),
  type: Yup?.string()?.required('Field is Required'),
  priority: Yup?.string()?.required('Field is Required'),
});

export const createTaskDefaultValues = ({ data }: any) => {
  const inputDate = new Date(data?.dueDate);
  const inputTime = new Date(data?.time);

  function isValidDate(date: any) {
    return date instanceof Date && !isNaN(date?.getTime());
  }

  return {
    name: data?.name ?? '',
    type: data?.type ?? '',
    priority: data?.priority ?? '',
    status: data?.status ?? '',
    assignTo: data?.assignTo || null,
    dueDate: isValidDate(inputDate) ? inputDate : null,
    time: isValidDate(inputTime) ? inputTime : null,
    reminder: data?.reminder ?? '',
    note: data?.note ?? '',
  };
};

export const dealsTasksDataArray = ({ openDrawer, usersData }: any) => {
  const { user }: { user: any } = getSession();
  return [
    {
      md: 12,
      componentProps: {
        placeholder: 'Enter Name',
        label: 'Task Name',
        name: 'name',
        required: openDrawer === 'View' ? false : true,
        disabled: openDrawer === 'View' ? true : false,
      },
      component: RHFTextField,
    },
    {
      md: 8,
      componentProps: {
        label: 'Task Type',
        name: 'type',
        select: true,
        required: openDrawer === 'View' ? false : true,
        placeholder: 'Enter Name',
        disabled: openDrawer === 'View' ? true : false,
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
        required: openDrawer === 'View' ? false : true,
        disabled: openDrawer === 'View' ? true : false,
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
        disabled: openDrawer === 'View' ? true : false,
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
        disabled: openDrawer === 'View' ? true : false,
      },
      component: RHFDatePicker,
    },
    {
      md: 5,
      componentProps: {
        label: 'Time',
        name: 'time',
        disabled: openDrawer === 'View' ? true : false,
      },
      component: RHFTimePicker,
    },
    {
      md: 12,
      componentProps: {
        label: 'Reminder',
        name: 'reminder',
        disabled: openDrawer === 'View' ? true : false,
        select: true,
      },
      options: [
        { label: 'Today', value: 'Today' },
        { label: 'Tomorrow', value: 'Tomorrow' },
        { label: 'In 1 business day', value: 'In_1_Business_Day' },
        { label: 'In 2 business day', value: 'In_2_Business_Day' },
      ],
      component: RHFSelect,
    },
    {
      md: 12,
      componentProps: {
        label: 'Note',
        name: 'note',
        disabled: openDrawer === 'View' ? true : false,
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
