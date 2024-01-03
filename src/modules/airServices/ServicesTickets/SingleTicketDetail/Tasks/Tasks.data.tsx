import { Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { styles } from './Tasks.styles';
import { DATE_FORMAT } from '@/constants';

export const tasksTableColumns: any = (
  activeCheck: any,
  setActiveCheck: any,
  setIsDetailDrawerOpen: any,
  theme: any,
  tableData: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!activeCheck?.find((item: any) => item?._id === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([
                  ...activeCheck,
                  tableData?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setActiveCheck(
                  activeCheck?.filter((item: any) => {
                    return item?._id !== info?.getValue();
                  }),
                );
          }}
          color="primary"
          name={info?.getValue()}
        />
      ),
      header: (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={activeCheck?.length === tableData?.length}
          onChange={(e: any) => {
            e?.target?.checked
              ? setActiveCheck([...tableData])
              : setActiveCheck([]);
          }}
          color="primary"
          name="_id"
        />
      ),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: theme?.palette?.custom?.bright, cursor: 'pointer' }}
          onClick={() => {
            setIsDetailDrawerOpen(info?.getValue(), true);
          }}
        >
          #TSK-{info?.getValue()?.slice(-3)?.toUpperCase()}
        </Typography>
      ),
      header: 'Task ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row,
      id: 'startDate endDate ',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        `${dayjs(info?.getValue()?.startDate)?.format('MMM DD')} - ${dayjs(
          info?.getValue()?.endDate,
        )?.format(DATE_FORMAT?.UI)}`,
    },
    {
      accessorFn: (row: any) => row?.assignedUser,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        info?.getValue()
          ? `${info?.getValue()?.firstName} ${info?.getValue()?.lastName}`
          : 'Unknown',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        const statusValue = info?.getValue();
        return (
          <Typography
            variant="body2"
            sx={styles?.tableStatusStyle(statusValue, theme)}
          >
            {info?.getValue()}
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
