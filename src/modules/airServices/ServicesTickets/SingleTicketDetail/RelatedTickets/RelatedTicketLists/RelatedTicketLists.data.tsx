import { Typography } from '@mui/material';
import { TICKET_STATUS, TICKET_TYPE } from '@/constants/services';
import { fullName } from '@/utils/avatarUtils';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { NextRouter } from 'next/router';
import { RelatedTicketsTableRowI } from '../RelatedTickets.interface';
import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants/routes';
import { uiDateFormat } from '@/lib/date-time';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

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
        <CheckboxField
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
          name={info?.getValue()}
        />
      ),
      header: (
        <CheckboxField
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
          {info?.row?.original?.ticketType === TICKET_TYPE?.SR ? (
            <TruncateText
              text={info.getValue()}
              retainTextLeft="Request For: "
            />
          ) : (
            <TruncateText text={info.getValue()} />
          )}
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
        info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
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
        <CustomChip
          label={info?.getValue()?.toLowerCase() ?? '---'}
          variant="outlined"
          color={TICKET_STATUS_COLOR[info?.getValue()] ?? 'primary'}
          isCapital
        />
      ),
    },
  ];
};
