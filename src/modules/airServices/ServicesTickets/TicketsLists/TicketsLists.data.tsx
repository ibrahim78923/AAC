import {
  Box,
  Checkbox,
  Avatar,
  Typography,
  LinearProgress,
} from '@mui/material';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { SELECTED_ARRAY_LENGTH, TICKET_STATUS } from '@/constants/strings';
import dayjs from 'dayjs';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { errorSnackbar } from '@/utils/api';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

export const TICKETS_ACTION_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
  EDIT_TICKET: 'edit-ticket',
  ASSIGNED_TICKET: 'assigned-ticket',
  MOVE_TICKET: 'move-ticket',
  MERGE_TICKET: 'merge-ticket',
  DELETE_TICKET: 'delete-ticket',
};

export const ticketsActionDropdownFunction = (
  setTicketAction: any,
  selectedTicketList: any,
  updateTicketStatus: any,
  putSingleTicketStatusStatus: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
    ],
    title: 'Edit',
    disabled: putSingleTicketStatusStatus?.isLoading,
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.EDIT_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Assign To',
    disabled: putSingleTicketStatusStatus?.isLoading,
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 3,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Bulk Update',
    disabled: putSingleTicketStatusStatus?.isLoading,
    handleClick: (closeMenu: any) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA);
      closeMenu?.();
    },
  },
  {
    id: 4,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: 'Merge',
    disabled: putSingleTicketStatusStatus?.isLoading,
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.MERGE_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 5,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    disabled: putSingleTicketStatusStatus?.isLoading,
    title: 'Move',
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.MOVE_TICKET);
      closeMenu?.();
    },
  },
  {
    id: 6,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: putSingleTicketStatusStatus?.isLoading ? (
      <LinearProgress sx={{ width: '70px' }} />
    ) : (
      'Mark as Close'
    ),
    disabled: putSingleTicketStatusStatus?.isLoading,
    handleClick: async (closeMenu: any) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      await updateTicketStatus?.(TICKET_STATUS?.CLOSED);
      closeMenu?.();
    },
  },
  {
    id: 7,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    title: putSingleTicketStatusStatus?.isLoading ? (
      <LinearProgress sx={{ width: '70px' }} />
    ) : (
      'Mark as Spam'
    ),
    disabled: putSingleTicketStatusStatus?.isLoading,
    handleClick: async (closeMenu: any) => {
      if (selectedTicketList?.length > SELECTED_ARRAY_LENGTH?.ONE) {
        errorSnackbar('Please select only one ticket');
        closeMenu?.();
        return;
      }
      await updateTicketStatus?.(TICKET_STATUS?.SPAM);
      closeMenu?.();
    },
  },
  {
    id: 8,
    permissionKey: [AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS],
    disabled: putSingleTicketStatusStatus?.isLoading,
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.DELETE_TICKET);
      closeMenu?.();
    },
  },
];

export const ticketsListInitialColumns: string[] = [
  '_id',
  'ticketIdNumber',
  'subject',
  'requesterDetails',
  'agentDetails',
  'state',
  'status',
  'pirority',
];

export const ticketsListsColumnFunction: any = (
  router: NextRouter,
  ticketList = [],
  selectedTicketList: any,
  setSelectedTicketList: Dispatch<SetStateAction<any>>,
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
            !!selectedTicketList?.find((item: any) => item === info?.getValue())
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTicketList([...selectedTicketList, info?.getValue()])
              : setSelectedTicketList(
                  selectedTicketList?.filter(
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
            ticketList?.length
              ? selectedTicketList?.length === ticketList?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTicketList(
                  ticketList?.map((ticket: any) => ticket?._id),
                )
              : setSelectedTicketList([]);
          }}
          color="primary"
          name="_id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.ticketIdNumber,
      id: 'ticketIdNumber',
      cell: (info: any) => {
        return (
          <Box
            display={'flex'}
            gap={1.5}
            flexWrap={'wrap'}
            alignItems={'center'}
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: 'blue.main',
                width: 25,
                height: 25,
              }}
              src={generateImage(info?.row?.original?.attachment?.fileUrl)}
            >
              <Typography variant="body2" textTransform={'uppercase'}>
                {info?.row?.original?.departmentsDetails?.name?.[0] ?? '-'}
              </Typography>
            </Avatar>
            <Typography
              sx={{
                color: 'custom.bright',
                cursor: 'pointer',
              }}
              variant="body2"
              onClick={() => {
                router?.push({
                  pathname: AIR_SERVICES?.TICKETS_LIST,
                  query: {
                    ticketId: info?.row?.original?._id,
                  },
                });
              }}
            >
              {info?.getValue()}
            </Typography>
          </Box>
        );
      },
      header: 'Ticket ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.subject,
      id: 'subject',
      isSortable: true,
      header: 'Subject',
      cell: (info: any) => truncateText(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.requesterDetails,
      id: 'requesterDetails',
      isSortable: true,
      header: 'Requester',
      cell: (info: any) => (
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Avatar
            sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
            src={generateImage(
              info?.row?.original?.requesterDetails?.avatar?.url,
            )}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(
                info?.getValue()?.firstName,
                info?.getValue()?.lastName,
              )}
            </Typography>
          </Avatar>
          {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.agentDetails,
      id: 'agentDetails',
      isSortable: true,
      header: 'Assigned to',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.state,
      id: 'state',
      isSortable: true,
      header: 'State',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.pirority,
      id: 'pirority',
      isSortable: true,
      header: 'Priority',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.departmentsDetails,
      id: 'departmentsDetails',
      isSortable: true,
      header: 'Department',
      cell: (info: any) => info?.getValue()?.name ?? '---',
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.dueDate,
      id: 'dueDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        dayjs(info?.row?.original?.plannedEndDate)?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.impact,
      id: 'impact',
      isSortable: true,
      header: 'Impact',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.plannedStartDate,
      id: 'plannedStartDate',
      isSortable: true,
      header: 'Planned Start Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Planned End Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.plannedEffort,
      id: 'plannedEffort',
      isSortable: true,
      header: 'Planned Effort',
      cell: (info: any) => info?.getValue() ?? '---',
    },
  ];
};
