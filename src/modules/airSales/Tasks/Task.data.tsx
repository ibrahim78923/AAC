import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
import SearchableTabsSelect from '@/modules/airSales/Tasks/SearchableTabsSelect';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setSelectedTaskIds } from '@/redux/slices/taskManagement/taskManagementSlice';

export const filterDefaultValues = {
  assignee: '',
  taskStatus: '',
  priority: '',
  dueDate: '',
};

export const filterValidationSchema = Yup?.object()?.shape({
  assignee: Yup?.string(),
  taskStatus: Yup?.string(),
  priority: Yup?.string(),
  dueDate: Yup?.string(),
});

export const filterData = [
  {
    title: 'Assignee',
    componentProps: {
      name: 'assignee',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'Task Status',
    componentProps: {
      name: 'taskStatus',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'Priority',
    componentProps: {
      name: 'priority',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'Due date',
    componentProps: {
      name: 'dueDate',
    },
    component: RHFDatePicker,
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
    options: [{ value: 'value', label: 'label' }],
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

export const createTaskDefaultValues = () => {
  // const selectedTaskIds = useAppSelector(
  //   (state: any) => state?.task?.selectedTaskIds,
  // );

  return {
    name: '',
    type: '',
    priority: '',
    status: '',
    dealsIds: '',
    associate: '',
    assignTo: '',
    dueDate: null,
    time: null,
    reminder: '',
    note: '',
  };
};

export const createTaskData = () => {
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
        name: 'associate',
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
      cell: (info?: any) => info?.getValue(),
    },
    {
      accessorFn: (row?: any) => row?.name, // TODO Need to discuss
      id: 'associate',
      isSortable: true,
      header: 'Linked Company',
      cell: (info?: any) => info?.getValue(),
    },
    {
      accessorFn: (row?: any) => row?.assignTo,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned User',
      cell: (info?: any) => info?.row?.original?._id,
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
      cell: (info?: any) => info?.getValue(),
    },
  ];
};
