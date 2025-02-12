import { TicketTasksTableRowI } from '../Tasks.interface';
import { Typography } from '@mui/material';
import { fullName } from '@/utils/avatarUtils';
import { TICKET_TASKS_ACTIONS_CONSTANT } from '../Tasks.data';
import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';
import { CheckboxField } from '@/components/InputFields/CheckboxField';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CHIP_SHAPE, CHIP_VARIANTS } from '@/constants/mui-constant';
import { TASK_STATUS } from '@/constants/strings';

const { TICKET_TASKS_DETAIL } = TICKET_TASKS_ACTIONS_CONSTANT;

export const STATUS_CHIP_STYLE = {
  [TASK_STATUS?.TO_DO]: {
    borderColor: `primary.main`,
    backgroundColor: 'primary.lighter',
    color: 'primary.main ',
  },
  [TASK_STATUS?.IN_PROGRESS]: {
    borderColor: `custom.bright`,
    backgroundColor: 'custom.aqua_breeze',
    color: 'custom.bright',
  },
  [TASK_STATUS.DONE]: {
    borderColor: 'custom.custom_red',
    backgroundColor: 'custom.light_error',
    color: 'error.dark',
  },
};

export const ticketsTasksListsColumnsDynamic: any = (
  totalTasks = [],
  selectedTasksList: any,
  setSelectedTasksLists: any,
  setTicketTasksAction: (param: string, action?: string) => void,
) => {
  return [
    {
      accessorFn: (row: TicketTasksTableRowI) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <CheckboxField
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
          name={info?.getValue()}
        />
      ),
      header: (
        <CheckboxField
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
      cell: (info: any) => <TruncateText text={info.getValue()} />,
    },
    {
      accessorFn: (row: TicketTasksTableRowI) => row,
      id: 'startDate endDate ',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        info?.getValue()?.endDate
          ? `${uiDateFormat(info?.getValue()?.endDate)}`
          : '---',
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
          <CustomChip
            label={info?.getValue()}
            shape={CHIP_SHAPE?.SQUARE}
            variant={CHIP_VARIANTS?.OUTLINED}
            size="medium"
            backgroundColor={STATUS_CHIP_STYLE?.[statusValue]?.backgroundColor}
            textColor={STATUS_CHIP_STYLE?.[statusValue]?.color}
            borderColor={STATUS_CHIP_STYLE?.[statusValue]?.borderColor}
          />
        );
      },
    },
  ];
};
