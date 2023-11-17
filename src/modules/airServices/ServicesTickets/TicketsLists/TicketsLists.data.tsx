import { Box, Checkbox, Avatar, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { TICKET_STATUS } from '@/constants/strings';

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
  openDrawer: any,
  selectedTicketList: any,
  updateTicketStatus: any,
  openModal: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length !== 1) {
        enqueueSnackbar('Please select only one ticket', {
          variant: 'warning',
        });
        closeMenu?.();
        return;
      }
      openDrawer(TICKETS_ACTION_CONSTANTS?.EDIT_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Assignee',
    handleClick: (closeMenu: any) => {
      openModal(TICKETS_ACTION_CONSTANTS?.ASSIGNED_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Bulk Update',
    handleClick: (closeMenu: any) => {
      openDrawer(TICKETS_ACTION_CONSTANTS?.BULK_UPDATE_DATA);
      closeMenu?.();
    },
  },
  {
    title: 'Merge',
    handleClick: (closeMenu: any) => {
      if (selectedTicketList?.length !== 1) {
        enqueueSnackbar('Please select only one ticket', {
          variant: 'warning',
        });
        closeMenu?.();
        return;
      }
      openModal(TICKETS_ACTION_CONSTANTS?.MERGE_TICKET);
      closeMenu?.();
    },
  },
  {
    title: 'Move',
    handleClick: (closeMenu: any) => {
      openModal(TICKETS_ACTION_CONSTANTS?.MOVE_TICKET);
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
      openModal(TICKETS_ACTION_CONSTANTS?.DELETE_TICKET);
      closeMenu?.();
    },
  },
];

// export const ticketsListTotalColumns = [
//   '_id',
//   'subject',
//   'requester',
//   'status',
//   'pirority',
//   'assignedTo',
//   'department',
//   'state',
//   'createdAt',
//   'dueDate',
//   'impact',
//   'plannedStartDate',
//   'plannedEndDate',
//   'plannedEffort',
// ];
export const ticketsListInitialColumns = [
  '_id',
  'subject',
  'requester',
  'assignedTo',
  'state',
  'status',
  'pirority',
  'createdAt',
  'impact',
];
export const ticketsListTotalColumns = [
  '_id',
  'subject',
  'requester',
  'assignedTo',
  'state',
  'status',
  'pirority',
  'createdAt',
  'impact',
];

export const ticketsListsData: any = [
  {
    id: 3,
    ticketId: ` #917`,
    subject: 'fts',
    requester: { name: 'Leslie Alexander', profileImg: '' },
    status: 'closed',
    priority: 'medium',
    assignedTo: 'user3',
    department: 'IT',
    state: 'Overdue',
    createAt: '00000000',
    dueDate: '000000',
    impact: 'high',
    plannedStartDate: '11111',
    plannedEndDate: '00000',
    plannedEffort: 'o0o0o0',
  },
];

export const ticketsListsColumnFunction: any = (
  theme: any,
  router: any,
  ticketList: any,
  selectedTicketList: any,
  setSelectedTicketList: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
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
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => {
        return (
          <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
            <Avatar
              sx={{ bgcolor: theme?.palette?.blue?.main, borderRadius: 1.25 }}
              style={{ width: 28, height: 28 }}
              alt={info?.row?.original?.department}
            >
              {info?.row?.original?.department}
            </Avatar>
            <Typography
              sx={{
                color: theme?.palette?.primary?.main,
                cursor: 'pointer',
              }}
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
      accessorFn: (row: any) => row?.requester,
      id: 'requester',
      isSortable: true,
      header: 'Requester',
      cell: (info: any) => (
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Avatar
            style={{ width: 24, height: 24 }}
            src={info?.row?.original?.requester?.profileImg?.src}
            alt={info?.row?.original?.requester?.name}
          />

          {info?.getValue()?.name}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.state,
      id: 'state',
      isSortable: true,
      header: 'State',
      cell: (info: any) => info?.getValue(),
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
      accessorFn: (row: any) => row?.department,
      id: 'department',
      isSortable: true,
      header: 'Department',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'created Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.dueDate,
      id: 'dueDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.impact,
      id: 'impact',
      isSortable: true,
      header: 'impact',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.plannedStartDate,
      id: 'plannedStartDate',
      isSortable: true,
      header: 'Planned Start Date',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Planned End Date',
      cell: (info: any) => info?.getValue(),
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
