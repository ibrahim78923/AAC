import { Checkbox, Chip, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { TICKET_STATUS, TICKET_TYPE } from '@/constants/strings';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';
import { RelatedTicketsTableRowI } from '../RelatedTickets.interface';

const TICKET_STATUS_COLOR: any = {
  [TICKET_STATUS?.OPEN]: 'info',
  [TICKET_STATUS?.RESOLVED]: 'success',
  [TICKET_STATUS?.PENDING]: 'warning',
  [TICKET_STATUS?.SPAM]: 'error',
  [TICKET_STATUS?.CLOSED]: 'error',
};

export const relatedTicketsListsColumnDynamic: any = (
  data = [],
  selectedChildTickets = [],
  setSelectedChildTickets: any,
  router: NextRouter,
  overallPermissions?: any,
) => {
  return [
    {
      accessorFn: (row: RelatedTicketsTableRowI) =>
        row?.childTicketDetails?._id,
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
      accessorFn: (row: RelatedTicketsTableRowI) =>
        row?.childTicketDetails?.ticketIdNumber,
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
            if (
              !overallPermissions?.includes(
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_CHILD_TICKETS_DETAILS,
              )
            )
              return;
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
      accessorFn: (row: RelatedTicketsTableRowI) =>
        row?.childTicketDetails?.subject,
      id: 'subject',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => (
        <>
          {info?.row?.original?.ticketType === TICKET_TYPE?.SR
            ? `Request For: ${truncateText(info?.getValue())}`
            : truncateText(info?.getValue())}
        </>
      ),
    },
    {
      accessorFn: (row: RelatedTicketsTableRowI) =>
        row?.childTicketDetails?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        info?.getValue()
          ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
          : '---',
    },
    {
      accessorFn: (row: RelatedTicketsTableRowI) =>
        row?.childTicketDetails?.agentDetails,
      id: 'assignedto',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: RelatedTicketsTableRowI) =>
        row?.childTicketDetails?.status,
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
