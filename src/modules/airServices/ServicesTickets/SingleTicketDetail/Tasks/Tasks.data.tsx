import { Checkbox, useTheme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
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
        <span
          style={{ color: theme?.palette?.custom?.bright, cursor: 'pointer' }}
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
      cell: (info: any) => {
        const statusValue = info.getValue();
        return (
          <span style={styles?.tableStatusStyle(statusValue, theme)}>
            {info.getValue()}
          </span>
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

export const drawerDetail: any = (taskDetail: any, theme: any) => [
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
    details: (() => {
      const statusValue = taskDetail?.status;
      return (
        <span style={styles?.tableStatusStyle(statusValue, theme)}>
          {taskDetail?.status}
        </span>
      );
    })(),
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
