import { Checkbox, Chip, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { SELECTED_ARRAY_LENGTH, TICKET_STATUS } from '@/constants/strings';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { errorSnackbar } from '@/utils/api';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { DeleteRelatedTicket } from './DeleteRelatedTicket';
import { UpsertRelatedTicket } from './UpsertRelatedTicket';
import {
  RelatedTicketsIsPortalOpenI,
  RelatedTicketsPortalComponentPropsI,
  RelatedTicketsTableRowI,
} from './RelatedTickets.interface';
import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const renderPortalComponent = (
  isPortalOpen: RelatedTicketsIsPortalOpenI,
  portalComponentProps: RelatedTicketsPortalComponentPropsI,
) => {
  if (isPortalOpen?.isDelete) {
    return <DeleteRelatedTicket {...portalComponentProps} />;
  }
  if (isPortalOpen?.isUpsert) {
    return <UpsertRelatedTicket {...portalComponentProps} />;
  }
  return <></>;
};

const TICKET_STATUS_COLOR: any = {
  [TICKET_STATUS?.OPEN]: 'info',
  [TICKET_STATUS?.RESOLVED]: 'success',
  [TICKET_STATUS?.PENDING]: 'warning',
  [TICKET_STATUS?.SPAM]: 'error',
  [TICKET_STATUS?.CLOSED]: 'error',
};

export const columnsFunction: any = (
  data = [],
  selectedChildTickets = [],
  setSelectedChildTickets: Dispatch<SetStateAction<any>>,
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
      cell: (info: any) => truncateText(info?.getValue()),
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

export const relatedTicketsActionDropdownFunction = (
  setIsPortalOpen: Dispatch<SetStateAction<RelatedTicketsIsPortalOpenI>>,
  selectedChildTickets: any,
) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_CHILD_TICKETS],
    title: 'Edit',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      if (selectedChildTickets?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setIsPortalOpen?.({
        isOpen: true,
        isUpsert: true,
      });
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_CHILD_TICKETS],
    title: 'Delete',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setIsPortalOpen?.({
        isOpen: true,
        isDelete: true,
      });
      closeMenu?.();
    },
  },
];
