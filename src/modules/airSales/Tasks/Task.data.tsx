import {
  RHFDatePicker,
  RHFEditor,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import GridView from './GridView';

export const tasksColumns: any = [
  {
    accessorFn: (row?: any) => row?.Id,
    id: 'Id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row?: any) => row?.taskName,
    id: 'taskName',
    cell: (info?: any) => info?.getValue(),
    header: 'Task Name',
    isSortable: true,
  },
  {
    accessorFn: (row?: any) => row?.taskStatus,
    id: 'taskStatus',
    isSortable: true,
    header: 'Task Status',
    cell: (info?: any) => info?.getValue(),
  },
  {
    accessorFn: (row?: any) => row?.linkedCompany,
    id: 'linkedCompany',
    isSortable: true,
    header: 'Linked Company',
    cell: (info?: any) => info?.getValue(),
  },
  {
    accessorFn: (row?: any) => row?.assignedUser,
    id: 'assignedUser',
    isSortable: true,
    header: 'Assigned User',
    cell: (info?: any) => info?.getValue(),
  },
  {
    accessorFn: (row?: any) => row?.taskType,
    id: 'taskType',
    isSortable: true,
    header: 'task Type',
    cell: (info?: any) => info?.getValue(),
  },
  {
    accessorFn: (row?: any) => row?.lastDate,
    id: 'lastDate',
    isSortable: true,
    header: 'last Date',
    cell: (info?: any) => info?.getValue(),
  },
];

export const filterData = [
  {
    title: 'Assignee',
    componentProps: {
      name: 'assignee',
      label: 'select',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'Task Status',
    componentProps: {
      name: 'taskStatus',
      label: 'select',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'Priority',
    componentProps: {
      name: 'priority',
      label: 'select',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    title: 'Due date',
    componentProps: {
      name: 'dueDate',
      label: 'select',
    },
    component: RHFDatePicker,
  },
  {
    title: 'Queue',
    componentProps: {
      name: 'queue',
      label: 'select',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
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

export const createTaskData = [
  {
    gridLength: 12,
    title: 'Task Name',
    symbol: '*',
    componentProps: {
      label: 'Enter Name',
      placeholder: 'Enter Name',
      name: 'taskName',
    },
    component: RHFTextField,
  },
  {
    gridLength: 8,
    title: 'Task Type',
    symbol: '*',
    componentProps: {
      name: 'taskType',
      label: 'Select',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 4,
    title: 'Priority',
    symbol: '*',
    componentProps: {
      label: 'Select',
      name: 'priority',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Task Status',
    componentProps: {
      label: 'Select',
      name: 'taskStatus',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Select Deal (Optional)',
    componentProps: {
      label: 'Select',
      name: 'selectDeal',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Associate with records',
    componentProps: {
      label: 'Select',
      name: 'associateRecord',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Assigned to',
    componentProps: {
      label: 'Select',
      name: 'assignedTo',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 8,
    title: 'Due date',
    componentProps: {
      label: 'Select',
      name: 'dueDate',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
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
      label: 'Select',
      select: true,
    },
    options: [{ label: 'label', value: 'value' }],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Note',
    componentProps: {
      name: 'reminder',
    },
    component: RHFEditor,
  },
];

const tableMockData = [
  {
    id: '1',
    taskName: 'verification',
    taskStatus: 'inprogress',
    linkedCompany: 'apple',
    assignedUser: 'darlene robertson',
    taskType: 'email',
    lastDate: '21-03-2023 01:46 PM',
  },
  {
    id: '2',
    taskName: 'deal lock',
    taskStatus: 'pending',
    linkedCompany: 'dell',
    assignedUser: 'darlene robertson',
    taskType: 'call',
    lastDate: '21-03-2023 01:46 PM',
  },
  {
    id: '3',
    taskName: 'service maintenance',
    taskStatus: 'completed',
    linkedCompany: 'microsoft',
    assignedUser: 'darlene robertson',
    taskType: 'email',
    lastDate: '21-03-2023 01:46 PM',
  },
  {
    id: '4',
    taskName: 'server install',
    taskStatus: 'my-task',
    linkedCompany: 'apple',
    assignedUser: 'darlene robertson',
    taskType: 'email',
    lastDate: '21-03-2023 01:46 PM',
  },
  {
    id: '5',
    taskName: 'verification',
    taskStatus: 'my-task',
    linkedCompany: 'apple',
    assignedUser: 'darlene robertson',
    taskType: 'email',
    lastDate: '21-03-2023 01:46 PM',
  },
];

const TaskTableData = (type: string) =>
  type === 'all'
    ? tableMockData
    : tableMockData.filter((obj) => obj.taskStatus === type);

export const TasksData = [
  {
    index: 0,
    label: 'All',
    tableChildren: (
      <TanstackTable data={TaskTableData('all')} columns={tasksColumns} />
    ),
    gridChildtren: (
      <GridView
        title={'All'}
        data={TaskTableData('all')}
        myTaskData={TaskTableData('my-task')}
        pendingData={TaskTableData('pending')}
        inprogressData={TaskTableData('inprogress')}
        completedData={TaskTableData('completed')}
      />
    ),
  },
  {
    index: 1,
    label: 'My Tasks',
    tableChildren: (
      <TanstackTable data={TaskTableData('my-task')} columns={tasksColumns} />
    ),
    gridChildtren: (
      <GridView title={'My Tasks'} data={TaskTableData('my-task')} />
    ),
  },
  {
    index: 2,
    label: 'Pending',
    tableChildren: (
      <TanstackTable data={TaskTableData('pending')} columns={tasksColumns} />
    ),
    gridChildtren: (
      <GridView title={'pending'} data={TaskTableData('pending')} />
    ),
  },
  {
    index: 3,
    label: 'In-Progress',
    tableChildren: (
      <TanstackTable
        data={TaskTableData('inprogress')}
        columns={tasksColumns}
      />
    ),
    gridChildtren: (
      <GridView title={'inprogress'} data={TaskTableData('inprogress')} />
    ),
  },
  {
    index: 4,
    label: 'Completed',
    tableChildren: (
      <TanstackTable data={TaskTableData('completed')} columns={tasksColumns} />
    ),
    gridChildtren: (
      <GridView title={'completed'} data={TaskTableData('completed')} />
    ),
  },
];
