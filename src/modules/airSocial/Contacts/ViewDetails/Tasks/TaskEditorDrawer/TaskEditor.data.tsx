import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { ROLES } from '@/constants/strings';
import { getSession } from '@/utils';

export const viewTaskDefaultValues = (data: any) => {
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

export const viewTaskData = (usersData: any) => {
  const { user }: { user: any } = getSession();

  return [
    {
      md: 12,
      componentProps: {
        placeholder: 'Enter Name',
        label: 'Task Name',
        name: 'name',
        required: true,
        disabled: true,
      },
      component: RHFTextField,
    },
    {
      md: 7,
      componentProps: {
        label: 'Task Type',
        name: 'type',
        select: true,
        required: true,
        placeholder: 'Enter Name',
        disabled: true,
      },
      options: [
        { label: 'Call', value: 'Call' },
        { label: 'Email', value: 'Email' },
      ],
      component: RHFSelect,
    },
    {
      md: 5,
      componentProps: {
        label: 'Priority',
        name: 'priority',
        select: true,
        required: true,
        disabled: true,
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
        disabled: true,
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
        disabled: true,
        apiQuery: usersData,
        externalParams: {
          organization: user?.organization?._id,
          role: ROLES?.ORG_EMPLOYEE,
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
        disablePast: true,
        disabled: true,
      },
      component: RHFDatePicker,
    },
    {
      md: 5,
      componentProps: {
        label: 'Time',
        name: 'time',
        format: 'hh:mm',
        disabled: true,
      },
      component: RHFTimePicker,
    },
    {
      md: 12,
      componentProps: {
        label: 'Reminder',
        name: 'reminder',
        select: true,
        disabled: true,
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
        disabled: true,
      },
      component: RHFEditor,
    },
  ];
};
