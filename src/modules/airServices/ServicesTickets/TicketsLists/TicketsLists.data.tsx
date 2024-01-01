import { Box, Checkbox, Avatar, Typography } from '@mui/material';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import {
  NOTISTACK_VARIANTS,
  TICKETS_STATE,
  TICKET_STATUS,
} from '@/constants/strings';
import dayjs from 'dayjs';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

const todayDate = dayjs()?.format('MM/DD/YYYY');

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
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length > 1) {
        enqueueSnackbar('Please select only one ticket', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.EDIT_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Assign To',
    handleClick: (closeMenu: any) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Bulk Update',
    handleClick: (closeMenu: any) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA);
      closeMenu?.();
    },
  },
  {
    title: 'Merge',
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length > 1) {
        enqueueSnackbar('Please select only one ticket', {
          variant: NOTISTACK_VARIANTS?.WARNING,
        });
        closeMenu?.();
        return;
      }
      setTicketAction(TICKETS_ACTION_CONSTANTS?.MERGE_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Move',
    handleClick: (closeMenu: any) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.MOVE_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Mark as Close',
    handleClick: (closeMenu: any) => {
      updateTicketStatus?.(TICKET_STATUS?.CLOSED);
      closeMenu?.();
    },
  },
  {
    title: 'Mark as Spam',
    handleClick: (closeMenu: any) => {
      updateTicketStatus?.(TICKET_STATUS?.SPAM);
      closeMenu?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setTicketAction(TICKETS_ACTION_CONSTANTS?.DELETE_TICKET);
      closeMenu?.();
    },
  },
];

export const ticketsListInitialColumns = [
  '_id',
  'ticketIdNumber',
  'subject',
  'requesterDetails',
  'agentDetails',
  'state',
  'status',
  'pirority',
];

export const ticketsListsData: any = [
  {
    _id: '658aaf31e7b1a059b6f2ae4d',
    ticketId: ` #SR-917`,
    subject: 'What is wrong with my email',
    requester: { name: 'Leslie Alexander', profileImg: '' },
    status: 'closed',
    priority: 'medium',
    assignedTo: 'user3',
    department: 'IT',
    state: 'Overdue',
    createAt: new Date(todayDate),
    dueDate: new Date(todayDate),
    impact: 'high',
    plannedStartDate: new Date(todayDate),
    plannedEndDate: new Date(todayDate),
    plannedEffort: '1 hour',
  },
  {
    _id: '658bfde764c8bd0f7ee86766',
    ticketId: ` #SR-917`,
    subject: 'What is wrong with my email',
    requester: { name: 'Leslie Alexander', profileImg: '' },
    status: 'closed',
    priority: 'medium',
    assignedTo: 'user3',
    department: 'IT',
    state: 'Overdue',
    createAt: new Date(todayDate),
    dueDate: new Date(todayDate),
    impact: 'high',
    plannedStartDate: new Date(todayDate),
    plannedEndDate: new Date(todayDate),
    plannedEffort: '1 hour',
  },
];

const TICKET_STATE_CONDITION = {
  NEW: 2,
  RESPONSE_DUE: 0,
};

const checkStatus = (startDate: any, expiryDate: any) => {
  const currentDate: any = new Date();
  const startDiff: any = Math?.round(
    (currentDate - startDate) / (1000 * 60 * 60 * 24),
  );
  const expiryDiff = Math?.round(
    (expiryDate - currentDate) / (1000 * 60 * 60 * 24),
  );

  if (startDiff <= TICKET_STATE_CONDITION?.NEW) {
    return TICKETS_STATE?.NEW;
  } else if (expiryDiff > TICKET_STATE_CONDITION?.RESPONSE_DUE) {
    return TICKETS_STATE?.RESPONSE_DUE;
  } else {
    return TICKETS_STATE?.OVERDUE;
  }
};

const fullName = (firstName: any, lastName: any) => {
  if (!!!firstName && !!!lastName) return 'None';
  return `${firstName ?? ''} ${lastName ?? ''}`;
};

export const ticketsListsColumnFunction: any = (
  theme: any,
  router: any,
  ticketList: any = ticketsListsData,
  selectedTicketList: any,
  setSelectedTicketList: any,
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
          <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
            <Avatar
              sx={{ bgcolor: theme?.palette?.blue?.main, borderRadius: 1.25 }}
              style={{ width: 25, height: 25 }}
              src={
                info?.row?.original?.departmentsDetails?.departmenProfilePicture
              }
            >
              <Typography variant="body2" textTransform={'uppercase'}>
                {info?.row?.original?.departmentsDetails?.name?.split(
                  ' ',
                )?.[0][0] ?? '-'}
                {
                  info?.row?.original?.departmentsDetails?.name?.split(
                    ' ',
                  )?.[1]?.[0]
                }
              </Typography>
            </Avatar>
            <Typography
              sx={{
                color: theme?.palette?.primary?.main,
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
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.requesterDetails,
      id: 'requesterDetails',
      isSortable: true,
      header: 'Requester',
      cell: (info: any) => (
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Avatar
            sx={{ bgcolor: theme?.palette?.blue?.main }}
            style={{ width: 28, height: 28 }}
            src={info?.row?.original?.requesterDetails?.profileImg?.src}
          />
          {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)},
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
      // cell: (info: any) => info?.getValue(), //TODO: integration pending
      cell: (info: any) =>
        checkStatus?.(
          new Date(info?.row?.original?.plannedStartDate),
          new Date(info?.row?.original?.plannedEndDate),
        ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.pirority,
      id: 'pirority',
      isSortable: true,
      header: 'Priority',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.departmentsDetails,
      id: 'departmentsDetails',
      isSortable: true,
      header: 'Department',
      cell: (info: any) => info?.getValue()?.name,
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
      cell: (info: any) => info?.getValue(),
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
      cell: (info: any) => info?.getValue(),
    },
  ];
};
