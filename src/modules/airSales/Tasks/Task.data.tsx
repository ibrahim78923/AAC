import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setSelectedTaskIds } from '@/redux/slices/taskManagement/taskManagementSlice';
import SearchableTabsSelect from './searchableTabsSelect';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';

export const filterDefaultValues = {
  assignTo: '',
  status: '',
  priority: '',
  dueDate: null,
};

export const filterValidationSchema = Yup?.object()?.shape({
  assignTo: Yup.string(),
  status: Yup.string(),
  priority: Yup.string(),
  // dueDate: Yup.date(),
});

export const filterData = [
  {
    md: 12,
    componentProps: {
      label: 'Assignee',
      name: 'assignTo',
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
      label: 'Priority',
      name: 'priority',
      select: true,
    },
    options: [
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
    ],
    component: RHFSelect,
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
];

export const drawerTasksData = [
  { title: 'Task Name' },
  { title: 'Task Status' },
  { title: 'Linked Company' },
  { title: 'Assigned User' },
  { title: 'Task Type' },
  { title: 'Last Date' },
];

export const matchColumnsData = [
  {
    title: 'task name',
    componentProps: {
      name: 'taskName',
      label: 'Name',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'task status',
    componentProps: {
      name: 'taskStatus',
      label: 'Status',
      select: true,
    },
    options: [
      { label: 'Pending', value: 'Pending' },
      { label: 'Inprogress', value: 'Inprogress' },
      { label: 'Complete', value: 'Complete' },
    ],
    component: RHFTextField,
  },
  {
    title: 'task type',
    componentProps: {
      name: 'taskType',
      label: 'Type',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'last date',
    componentProps: {
      name: 'lastDate',
      label: 'Date',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
];

export const createTaskValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()?.required('Field is Required')?.trim(),
  type: Yup?.string()?.trim()?.required('Field is Required'),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
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
    dealsIds: data?.dealsIds ?? '',
    assignTo: data?.assignTo ?? '',
    dueDate: isValidDate(inputDate) ? inputDate : null,
    time: isValidDate(inputTime) ? inputTime : null,
    reminder: data?.reminder ?? '',
    note: data?.note ?? '',
  };
};

export const createTaskData = ({ data }: any) => {
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
        label: 'Select Deal (Optional)',
        name: 'dealsIds',
        select: true,
      },
      options: [
        { label: 'Laptop Purchase', value: 'Laptop Purchase' },
        { label: 'Mouse Repair', value: 'Mouse Repair' },
        { label: 'AC Purchase', value: 'AC Purchase' },
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
        select: true,
      },
      options: [
        { label: 'Jhon Doe', value: 'Jhon Doe' },
        { label: 'Jhon Doe', value: 'Jhon Doe' },
      ],
      component: RHFSelect,
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

export const TasksData = () => {
  const dispatch: any = useAppDispatch();

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task?.selectedTaskIds,
  );

  const handleClick = (itemId: any) => {
    if (selectedTaskIds.includes(itemId)) {
      dispatch(
        setSelectedTaskIds(selectedTaskIds?.filter((id: any) => id !== itemId)),
      );
    } else {
      dispatch(setSelectedTaskIds([...selectedTaskIds, itemId]));
    }
  };

  return [
    {
      accessorFn: (row?: any) => row?.Id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          checked={selectedTaskIds?.includes(info?.row?.original?._id)}
          color="primary"
          name={info?.getValue()}
          onClick={() => handleClick(info?.row?.original?._id)}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row?: any) => row?.name,
      id: 'name',
      cell: (info?: any) => info?.getValue(),
      header: 'Task Name',
      isSortable: true,
    },
    {
      accessorFn: (row?: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Task Status',
      cell: (info?: any) => info?.row?.original?.status ?? '-',
    },
    {
      accessorFn: (row?: any) => row?.name, // TODO Need to discuss
      id: 'associate',
      isSortable: true,
      header: 'Linked Company',
      cell: (info?: any) => info?.row?.original?.company ?? '-',
    },
    {
      accessorFn: (row?: any) => row?.assignTo,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned User',
      cell: (info?: any) =>
        info?.row?.original?.assignTo
          ? info?.row?.original?.assignTo?.firstName +
            ' ' +
            info?.row?.original?.assignTo?.lastName
          : '-',
    },
    {
      accessorFn: (row?: any) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'Task Type',
      cell: (info?: any) => info?.getValue(),
    },
    {
      accessorFn: (row?: any) => row?.updatedAt,
      id: 'updatedAt',
      isSortable: true,
      header: 'last Date',
      cell: (info?: any) =>
        dayjs(info?.row?.original?.updatedAt).format(DATE_TIME_FORMAT?.YMDHM),
    },
  ];
};
