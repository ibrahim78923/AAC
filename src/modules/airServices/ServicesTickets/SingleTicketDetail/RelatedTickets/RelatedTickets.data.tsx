import { Checkbox, Chip, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { TICKET_STATUS } from '@/constants/strings';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { errorSnackbar } from '@/utils/api';

const TICKET_STATUS_COLOR: any = {
  [TICKET_STATUS?.OPEN]: 'info',
  [TICKET_STATUS?.RESOLVED]: 'success',
  [TICKET_STATUS?.PENDING]: 'warning',
  [TICKET_STATUS?.SPAM]: 'error',
  [TICKET_STATUS?.CLOSED]: 'error',
};

export const columnsFunction: any = (
  data: any = [],
  selectedChildTickets: any = [],
  setSelectedChildTickets?: any,
  router?: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.childTicketDetails?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedChildTickets?.find(
              (item: any) => item === info?.getValue(),
            )
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
              ? setSelectedChildTickets(
                  data?.map((ticket: any) => ticket?.childTicketDetails?._id),
                )
              : setSelectedChildTickets([]);
          }}
          color="primary"
          name="Id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.childTicketDetails?.ticketIdNumber,
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
                ticketId: info?.row?.original?.childTicketDetails?._id,
              },
            });
          }}
        >
          {info?.getValue()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.childTicketDetails?.subject,
      id: 'subject',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => truncateText(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.childTicketDetails?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        info?.getValue()
          ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
          : '---',
    },
    {
      accessorFn: (row: any) => row?.childTicketDetails?.agentDetails,
      id: 'assignedto',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.childTicketDetails?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Chip
          label={info?.getValue() ?? '---'}
          variant="outlined"
          size="small"
          color={TICKET_STATUS_COLOR[info?.getValue()] ?? 'primary'}
        />
      ),
    },
  ];
};

export const relatedTicketsActionDropdownFunction = (
  setIsDelete: any,
  selectedChildTickets: any,
  setIsDrawerOpen: any,
) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_CHILD_TICKETS],
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedChildTickets?.length > 1) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setIsDrawerOpen(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_CHILD_TICKETS],
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setIsDelete(true);
      closeMenu?.();
    },
  },
];
