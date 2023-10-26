import { Checkbox, Typography, useTheme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { styles } from './Tasks.styles';

export const tasksTableColumns: any = (
  activeCheck: any,
  setActiveCheck: any,
  setIsDetailDrawerOpen: any,
) => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck.find((item: any) => item.Id === info.getValue())
          }
          onChange={(e: any) => {
            e.target.checked
              ? setActiveCheck([
                  ...activeCheck,
                  tasksTableData.find(
                    (item: any) => item.Id === info.getValue(),
                  ),
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
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
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
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.bright, cursor: 'pointer' }}
          onClick={() => {
            setIsDetailDrawerOpen(info.getValue(), true);
          }}
        >
          {info.getValue()}
        </Typography>
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
      cell: (info: any) => {
        const statusValue = info.getValue();
        return (
          <Typography
            variant="body2"
            sx={styles?.tableStatusStyle(statusValue, theme)}
          >
            {info.getValue()}
          </Typography>
        );
      },
    },
  ];
};
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
