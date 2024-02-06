import {
  RHFDatePicker,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import { Checkbox } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import GridView from './GridView';
import { useTask } from './useTask';
import * as Yup from 'yup';
import SearchableTabsSelect from '@/modules/airSales/Tasks/searchableTabsSelect/SearchableTabsSelect';

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
  name: Yup?.string()?.required('Field is Required').trim(),
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
      placeholder: 'Enter Name',
    },
    options: [
      { label: 'Call', value: 'Call' },
      { label: 'Email', value: 'Email' },
    ],
    component: RHFSelect,
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
    component: RHFSelect,
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
    component: RHFSelect,
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
    component: RHFSelect,
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
    component: RHFSelect,
  },
  {
    gridLength: 7,
    title: 'Due date',
    componentProps: {
      name: 'dueDate',
      select: true,
    },
    component: RHFDatePicker,
  },
  {
    gridLength: 5,
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
    component: RHFSelect,
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

export const tasksColumns: any = [
  {
    accessorFn: (row?: any) => row?.Id,
    id: '_id',
    cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
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

export const TasksData = () => {
  const { taskData, setPage, setPageLimit, isLoading } = useTask();
  const dataCheck = taskData?.data?.taskmanagements ?? [];
  const TaskTableData = (type: string) =>
    type === 'all'
      ? dataCheck
      : dataCheck?.filter((obj: any) => obj?.status === type);

  return [
    {
      index: 0,
      label: 'All',
      tableChildren: (
        <TanstackTable
          data={TaskTableData('all')}
          columns={tasksColumns}
          isLoading={isLoading}
          totalRecords={taskData?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={taskData?.data?.meta?.pages}
          isPagination
        />
      ),
      gridChildtren: (
        <GridView
          title={'All'}
          data={TaskTableData('all')}
          myTaskData={TaskTableData('my-task')}
          pendingData={TaskTableData('Pending')}
          inprogressData={TaskTableData('inprogress')}
          completedData={TaskTableData('Complete')}
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
        <TanstackTable data={TaskTableData('Pending')} columns={tasksColumns} />
      ),
      gridChildtren: (
        <GridView title={'Pending'} data={TaskTableData('Pending')} />
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
        <TanstackTable
          data={TaskTableData('Complete')}
          columns={tasksColumns}
        />
      ),
      gridChildtren: (
        <GridView title={'Complete'} data={TaskTableData('Complete')} />
      ),
    },
  ];
};
