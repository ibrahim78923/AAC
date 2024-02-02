import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { NOTISTACK_VARIANTS, TICKET_STATUS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { fullName } from '@/utils/avatarUtils';

export const columnsFunction: any = (
  data: any = [],
  selectedChildTickets: any = [],
  setSelectedChildTickets?: any,
  theme?: any,
  router?: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedChildTickets?.find((item: any) => item === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedChildTickets([
                ...selectedChildTickets,
                info?.getValue(),
              ])
            : setSelectedChildTickets(
                selectedChildTickets?.filter(
                  (item: any) => item !== info?.getValue(),
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
          data?.length ? selectedChildTickets?.length === data?.length : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedChildTickets(data?.map((ticket: any) => ticket?._id))
            : setSelectedChildTickets([]);
        }}
        color="primary"
        name="Id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.ticketIdNumber,
    id: 'ticketIdNumber',
    header: 'Tickets ID',
    isSortable: true,
    cell: (info: any) => (
      <Typography
        sx={{
          color: 'info.main',
          cursor: 'pointer',
        }}
        onClick={() => {
          router?.push({
            pathname: AIR_SERVICES?.CHILD_TICKETS_DETAIL,
            query: {
              ticketId: info?.row?.original?._id,
            },
          });
        }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.subject,
    id: 'subject',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.plannedEndDate,
    id: 'plannedEndDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) =>
      info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: any) => row?.assignedto,
    id: 'assignedto',
    isSortable: true,
    header: 'Assigned To',
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => {
      const status = info?.getValue();
      const color =
        status === TICKET_STATUS?.OPEN
          ? theme?.palette?.info?.main
          : status === TICKET_STATUS?.PENDING
          ? theme?.palette?.warning?.main
          : status === TICKET_STATUS?.RESOLVED
          ? theme?.palette?.success?.main
          : theme?.palette?.error?.main;
      return (
        <Typography
          sx={{
            border: color ? `1px solid ${color}` : 'none',
            color: color,
            padding: '3px 10px',
            borderRadius: '16px',
            cursor: 'pointer',
            width: 'fit-content',
            textTransform: 'capitalize',
          }}
        >
          {status?.toLowerCase()}
        </Typography>
      );
    },
  },
];

export const relatedTicketsActionDropdownFunction = (
  setIsDelete: any,
  selectedChildTickets: any,
  setIsDrawerOpen: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedChildTickets?.length > 1) {
        enqueueSnackbar('Please select only one ticket', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      setIsDrawerOpen(true);
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setIsDelete(true);
      closeMenu?.();
    },
  },
];
