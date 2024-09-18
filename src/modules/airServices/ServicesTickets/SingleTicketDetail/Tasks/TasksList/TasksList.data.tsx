import { TicketTasksTableRowI } from '../Tasks.interface';
import { Checkbox, Theme, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { DATE_MONTH_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';

import { uiDateFormat } from '@/utils/dateTime';
import { styles } from '../Tasks.styles';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';

const { TICKET_TASKS_DETAIL } = TICKET_TASKS_ACTIONS_CONSTANT;

export const ticketsTasksListsColumnsDynamic: any = (
  totalTasks = [],
  selectedTasksList: any,
  setSelectedTasksLists: any,
  setTicketTasksAction: (param: string) => void,
  theme: Theme,
) => {
  return [
    {
      accessorFn: (row: TicketTasksTableRowI) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedTasksList?.find(
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTasksLists([
                  ...selectedTasksList,
                  info?.row?.original,
                ])
              : setSelectedTasksLists(
                  selectedTasksList?.filter(
                    (item: any) => item?._id !== info?.getValue(),
                  ),
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
          checked={
            totalTasks?.length
              ? selectedTasksList?.length === totalTasks?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTasksLists(totalTasks?.map((item: any) => item))
              : setSelectedTasksLists([]);
          }}
          color="primary"
          name="id"
        />
      ),
    },
    {
      accessorFn: (row: TicketTasksTableRowI) => row?._id,
      id: 'TaskId',
      cell: (info: any) => (
        <Typography
          variant="body4"
          sx={{ color: 'custom.bright', cursor: 'pointer' }}
          onClick={() =>
            setTicketTasksAction?.(TICKET_TASKS_DETAIL, info?.row?.original)
          }
        >
          #TSK-{info?.getValue()?.slice?.(-3)?.toUpperCase()}
        </Typography>
      ),
      header: 'Task ID',
      isSortable: true,
    },
    {
      accessorFn: (row: TicketTasksTableRowI) => row?.title,
      id: 'title',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: TicketTasksTableRowI) => row,
      id: 'startDate endDate ',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        `${dayjs(info?.getValue()?.startDate)?.format(
          DATE_MONTH_FORMAT?.API,
        )} - ${uiDateFormat(info?.getValue()?.endDate)}`,
    },
    {
      accessorFn: (row: TicketTasksTableRowI) => row?.assignedUser,
      id: 'assignTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: TicketTasksTableRowI) => row?.status,
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
