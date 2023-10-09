import { Checkbox } from '@mui/material';
import { AvatarImage } from '@/assets/images';

export const tasksTableColumns: any = (
  activeCheck: any,
  setActiveCheck: any,
  setIsDetailDrawerOpen: any,
) => [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => (
      <Checkbox
        checked={!!activeCheck.find((item: any) => item.Id === info.getValue())}
        onChange={(e: any) => {
          e.target.checked
            ? setActiveCheck([
                ...activeCheck,
                tasksTableData.find((item: any) => item.Id === info.getValue()),
              ])
            : setActiveCheck(
                activeCheck.filter((item: any) => {
                  return item.Id !== info.getValue();
                }),
              );
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={activeCheck.length === tasksTableData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setActiveCheck([...tasksTableData])
            : setActiveCheck([]);
        }}
        color="primary"
        name="Id"
      />
    ),
  },
  {
    accessorFn: (row: any) => row.taskID,
    id: 'TaskID',
    cell: (info: any) => (
      <span
        style={{ color: '#0AADC7', cursor: 'pointer' }}
        onClick={() => {
          setIsDetailDrawerOpen(info.getValue(), true);
        }}
      >
        {info.getValue()}
      </span>
    ),
    header: 'Task ID',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.taskName,
    id: 'taskName',
    isSortable: true,
    header: 'Task Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.dueDate,
    id: 'dueDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.assignedTo,
    id: 'assignedTo',
    isSortable: true,
    header: 'Assigned To',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <span
        style={{
          border: `1px solid ${
            info.getValue() === 'To do'
              ? '#38CAB5'
              : info.getValue() === 'In-Progress'
              ? '#0AADC7'
              : '#FF4A4A'
          }`,
          backgroundColor:
            info.getValue() === 'To do'
              ? '#EBFAF8'
              : info.getValue() === 'In-Progress'
              ? '#E6F7F9'
              : '#FFEDED',
          color:
            info.getValue() === 'To do'
              ? '#38CAB5'
              : info.getValue() === 'In-Progress'
              ? '#0AADC7'
              : '#FF4A4A',
          padding: '8px 18px',
          borderRadius: '4px',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
];
export const tasksTableData: any = [
  {
    Id: 1,
    taskID: `# TSK - 5`,
    taskName: 'Business Platform debt, docs, refactors and stability',
    dueDate: 'Mar 3, - Mar 26, 2022',
    assignedTo: 'Robert Fox',
    status: 'To do',
  },
  {
    Id: 2,
    taskID: `# TSK - 6`,
    taskName: 'Search migration modelling',
    dueDate: '.......',
    assignedTo: 'Esther Howard',
    status: 'In-Progress',
  },
  {
    Id: 3,
    taskID: `# TSK - 7`,
    taskName: 'Style guide for online app store',
    dueDate: 'Mar 3, - Mar 27, 2022',
    assignedTo: 'Wade Warren',
    status: 'Done',
  },
];

export const drawerDetail: any = (taskDetail: any) => [
  {
    id: 1,
    title: 'Workspace',
    workspace: taskDetail?.workspace,
    details: taskDetail?.workspace,
  },
  {
    id: 2,
    title: 'Assign to',
    details: taskDetail?.assignedTo,
    profile: AvatarImage,
  },
  {
    id: 3,
    title: 'Status',
    details: (
      <span
        style={{
          border: `1px solid ${
            taskDetail?.status === 'To do'
              ? '#38CAB5'
              : taskDetail?.status === 'In-Progress'
              ? '#0AADC7'
              : '#FF4A4A'
          }`,
          backgroundColor:
            taskDetail?.status === 'To do'
              ? '#EBFAF8'
              : taskDetail?.status === 'In-Progress'
              ? '#E6F7F9'
              : '#FFEDED',
          padding: '8px 18px',
          borderRadius: '4px',
        }}
      >
        {taskDetail?.status}
      </span>
    ),
  },
  {
    id: 4,
    title: 'Notify before',
    details: taskDetail?.notifyBefore,
  },
  {
    id: 5,
    title: 'Due Date',
    details: taskDetail?.dueDate,
  },
  {
    id: 6,
    title: 'Planned Start Date',
    details: taskDetail?.plannedStartDate,
  },
  {
    id: 7,
    title: 'Planned End Date',
    details: taskDetail?.dueDate,
  },
  {
    id: 8,
    title: 'Planned  Effort',
    details: taskDetail?.plannedEffort,
  },
];
