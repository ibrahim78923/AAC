import { Checkbox } from '@mui/material';

export const data: any = [
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
export const columns: any = (
  setIsDrawerOpen: any,
  handleCheckboxChange: any,
) => [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => (
      <Checkbox
        color="primary"
        onChange={handleCheckboxChange}
        name={info.getValue()}
      />
    ),
    header: <Checkbox color="primary" name="Id" />,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.taskID,
    id: 'TaskID',
    cell: (info: any) => (
      <span
        style={{ color: '#0AADC7', cursor: 'pointer' }}
        onClick={() => {
          setIsDrawerOpen(true);
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
          padding: '8px 18px',
          borderRadius: '4px',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
];
