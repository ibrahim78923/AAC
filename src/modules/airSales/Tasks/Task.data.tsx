import {
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import * as Yup from 'yup';
import SearchableTabsSelect from '@/modules/airSales/Tasks/searchableTabsSelect/SearchableTabsSelect';
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
  name: Yup?.string()?.required('Field is Required'),
  type: Yup?.string()?.trim()?.required('Field is Required'),
  priority: Yup?.string()?.trim()?.required('Field is Required'),
  status: Yup?.string()?.trim()?.required('Field is Required'),
  deal: Yup?.string()?.trim()?.required('Field is Required'),
  associate: Yup?.string()?.trim()?.required('Field is Required'),
  assignTo: Yup?.string()?.trim()?.required('Field is Required'),
  dueDate: Yup?.string()?.trim()?.required('Field is Required'),
  time: Yup?.string()?.trim()?.required('Field is Required'),
  reminder: Yup?.string()?.trim()?.required('Field is Required'),
  note: Yup?.string()?.trim()?.required('Field is Required'),
});

export const createTaskDefaultValues = {
  name: '',
  type: '',
  priority: '',
  status: '',
  deal: '',
  associate: '',
  assignTo: '',
  dueDate: null,
  time: null,
  reminder: '',
  note: '',
};

export const createTaskData = [
  {
    gridLength: 12,
    title: 'Task Name',
    symbol: '*',
    componentProps: {
      placeholder: 'Enter Name',
      name: 'name',
    },
    component: RHFTextField,
  },
  {
    gridLength: 8,
    title: 'Task Type',
    symbol: '*',
    componentProps: {
      name: 'type',
      select: true,
    },
    options: [
      { label: 'Call', value: 'Call' },
      { label: 'Email', value: 'Email' },
    ],
    component: RHFTextField,
  },
  {
    gridLength: 4,
    title: 'Priority',
    symbol: '*',
    componentProps: {
      name: 'priority',
      select: true,
    },
    options: [
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
    ],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Task Status',
    componentProps: {
      name: 'status',
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
    gridLength: 12,
    title: 'Select Deal (Optional)',
    componentProps: {
      name: 'deal',
      select: true,
    },
    options: [
      { label: 'Laptop Purchase', value: 'Laptop Purchase' },
      { label: 'Mouse Repair', value: 'Mouse Repair' },
      { label: 'AC Purchase', value: 'AC Purchase' },
    ],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Associate with records',
    componentProps: {
      name: 'associate',
    },

    component: SearchableTabsSelect,
  },
  {
    gridLength: 12,
    title: 'Assigned to',
    componentProps: {
      name: 'assignTo',
      select: true,
    },
    options: [
      { label: 'Jhon Doe', value: 'Jhon Doe' },
      { label: 'Jhon Doe', value: 'Jhon Doe' },
    ],
    component: RHFTextField,
  },
  {
    gridLength: 8,
    title: 'Due date',
    componentProps: {
      name: 'dueDate',
      select: true,
    },
    component: RHFDatePicker,
  },
  {
    gridLength: 4,
    title: 'Time',
    componentProps: {
      name: 'time',
    },
    component: RHFTimePicker,
  },
  {
    gridLength: 12,
    title: 'Reminder',
    componentProps: {
      name: 'reminder',
      select: true,
    },
    options: [
      { label: 'Today', value: 'Today' },
      { label: 'Tomorrow', value: 'Tomorrow' },
      { label: 'In 1 business day', value: 'in1businessday' },
      { label: 'In 2 business day', value: 'in2businessday' },
    ],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Note',
    componentProps: {
      name: 'note',
    },
    component: RHFEditor,
  },
];

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
      accessorFn: (row?: any) => row?.associate, // TODO Need to discuss
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
      cell: (info?: any) => info?.getValue(),
    },
    {
      accessorFn: (row?: any) => row?.type,
      id: 'type',
      isSortable: true,
      header: 'task Type',
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
