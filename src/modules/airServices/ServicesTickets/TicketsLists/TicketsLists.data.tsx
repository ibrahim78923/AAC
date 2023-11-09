// import { v4 as uuidv4 } from 'uuid';
// import { AvatarImage } from '@/assets/images';
import {
  Box,
  Checkbox,
  // Select,
  // MenuItem,
  Avatar,
  Typography,
} from '@mui/material';
import { AIR_SERVICES } from '@/constants';

export const TABLE_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
  EDIT_TICKET: 'edit-ticket',
};

// const options = [
//   {
//     value: 'user1',
//     label: 'user1',
//   },
//   {
//     value: 'user2',
//     label: 'user2',
//   },
//   {
//     value: 'user3',
//     label: 'user3',
//   },
// ];

// const StatusOptions = [
//   {
//     value: 'open',
//     label: 'Open',
//   },
//   {
//     value: 'pending',
//     label: 'Pending',
//   },
//   {
//     value: 'resolved',
//     label: 'Resolved',
//   },
//   {
//     value: 'closed',
//     label: 'Closed',
//   },
// ];

// const priorityOptions = [
//   {
//     value: 'high',
//     label: 'High',
//   },
//   {
//     value: 'low',
//     label: 'Low',
//   },
//   {
//     value: 'medium',
//     label: 'Medium',
//   },
//   {
//     value: 'urgent',
//     label: 'Urgent',
//   },
// ];

export const ticketsActionDropdownFunction = (
  setDeleteModalOpen: any,
  markTicketAsClose: any,
  markTicketAsSpam: any,
) => [
  {
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Assignee',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Bulk Update',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Merge',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Move',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'Mark as Close',
    handleClick: (closeMenu: any) => {
      markTicketAsClose?.();
      closeMenu?.();
    },
  },
  {
    title: 'Mark as Spam',
    handleClick: (closeMenu: any) => {
      markTicketAsSpam?.();
      closeMenu?.();
    },
  },

  {
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
];

export const ticketsListTotalColumns = [
  '_id',
  'subject',
  'requester',
  'status',
  'pirority',
  'assignedTo',
  'department',
  'state',
  'createdAt',
  'dueDate',
  'impact',
  'plannedStartDate',
  'plannedEndDate',
  'plannedEffort',
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
  const { palette } = theme;
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          checked={
            !!selectedTicketList?.find(
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTicketList([
                  ...selectedTicketList,
                  ticketList?.find(
                    (item: any) => item?._id === info?.getValue(),
                  ),
                ])
              : setSelectedTicketList(
                  selectedTicketList?.filter((item: any) => {
                    return item?._id !== info?.getValue();
                  }),
                );
          }}
          color="primary"
          name={info?.getValue()}
        />
      ),
      header: (
        <Checkbox
          checked={selectedTicketList?.length === ticketList?.length}
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTicketList([...ticketList])
              : setSelectedTicketList([]);
          }}
          color="primary"
          name="id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
          <Avatar
            sx={{ bgcolor: palette?.blue?.main, borderRadius: 1.25 }}
            style={{ width: 28, height: 28 }}
          >
            IT
          </Avatar>
          <Typography
            style={{
              color: theme?.palette?.primary?.main,
              cursor: 'pointer',
            }}
            onClick={() => {
              router?.push({
                pathname: AIR_SERVICES?.TICKETS_LIST,
                query: {
                  ticketId: info?.getValue(),
                },
              });
            }}
          >
            {info?.getValue()}
          </Typography>
        </Box>
      ),
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
            sx={{ bgcolor: palette?.blue?.main }}
            style={{ width: 24, height: 24 }}
            src={info?.getValue()?.profileImg?.src}
          >
            <Typography component="span" fontSize={10} fontWeight={500}>
              {info?.getValue()?.name?.split(' ')?.[0][0]}
              {info?.getValue()?.name?.split(' ')?.[1][0]}
            </Typography>
          </Avatar>
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
