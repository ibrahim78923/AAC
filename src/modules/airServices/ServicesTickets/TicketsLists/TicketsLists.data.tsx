import { AvatarImage } from '@/assets/images';
import { Box, Checkbox, Select, MenuItem } from '@mui/material';
import Image from 'next/image';
import { uuid } from 'uuidv4';

export const TABLE_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
};
const options = [
  {
    value: 'user1',
    label: 'user1',
  },
  {
    value: 'user2',
    label: 'user2',
  },
  {
    value: 'user3',
    label: 'user3',
  },
];

const StatusOptions = [
  {
    value: 'open',
    label: 'Open',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'resolved',
    label: 'Resolved',
  },
  {
    value: 'closed',
    label: 'Closed',
  },
];

const priorityOptions = [
  {
    value: 'high',
    label: 'High',
  },
  {
    value: 'low',
    label: 'Low',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'urgent',
    label: 'Urgent',
  },
];

export const ticketsActionDropdownFunction = () =>
  // openDrawer: any,
  // setDeleteModalOpen: any,
  [
    {
      title: 'Edit',
      handleClick: (x: any) => {
        // openDrawer?.(TABLE_CONSTANTS.CREATE_NEW_TICKET);
        x?.();
      },
    },
    {
      title: 'Assignee',
      handleClick: (x: any) => {
        x?.();
      },
    },
    {
      title: 'Bulk Update',
      handleClick: (x: any) => {
        // openDrawer?.(TABLE_CONSTANTS.BULK_UPDATE_DATA);
        x?.();
      },
    },
    {
      title: 'Merge',
      handleClick: (x: any) => {
        x?.();
      },
    },
    {
      title: 'Move',
      handleClick: (x: any) => {
        x?.();
      },
    },
    {
      title: 'Mark as Close',
      handleClick: (x: any) => {
        x?.();
      },
    },
    {
      title: 'Mark as Spam',
      handleClick: (x: any) => {
        x?.();
      },
    },

    {
      title: 'Delete',
      handleClick: (x: any) => {
        // setDeleteModalOpen?.(true);
        x?.();
      },
    },
  ];

export const ticketsListsData: any = [
  {
    id: 1,
    ticketId: ` #717`,
    ticketName: 'Drafts',
    requester: 'Sharemydine',
    assignedTo: 'user1',
    status: 'open',
    state: 'Tech Support',
    priority: 'high',
  },
  {
    id: 2,
    ticketId: ` #787`,
    ticketName: 'rafts',
    requester: 'Sharemydine',
    assignedTo: 'user2',
    state: 'Tech Support',
    status: 'pending',
    priority: 'low',
  },
  {
    id: 3,
    ticketId: ` #917`,
    ticketName: 'fts',
    requester: 'Sharemydine',
    assignedTo: 'user3',
    state: 'Tech Support',
    status: 'closed',
    priority: 'medium',
  },
];
export const ticketsListsColumnFunction: any = (
  theme: any,
  router: any,
  handleChange: (value: any, event: any) => void,
) => {
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
      header: <Checkbox color="primary" name="id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.ticketId,
      id: 'ticketId',
      cell: (info: any) => (
        <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
          <Image src={AvatarImage} alt="Avatar" />
          <div
            style={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push({
                pathname: `${router.pathname}/detail`,
                query: {
                  id: info.getValue(),
                },
              });
            }}
          >
            {info.getValue()}
          </div>
        </Box>
      ),
      header: 'Ticket ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row.ticketName,
      id: 'ticketName',
      isSortable: true,
      header: 'Ticket Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.requester,
      id: 'requester',
      isSortable: true,
      header: 'Requester',
      cell: (info: any) => (
        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
          <Image src={AvatarImage} alt="Avatar" />
          <div style={{ color: theme.palette.primary.main }}>
            {info.getValue()}
          </div>
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row.assignedTo,
      id: 'assignedTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => (
        <Select
          name="assignedTo"
          sx={{
            minWidth: 80,
            '&.Mui-focused, .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '.MuiSvgIcon-root': {
              color: '#EAECF0',
            },
          }}
          defaultValue="none"
          value={info.getValue()}
          onChange={(e) => handleChange(info?.row?._valuesCache, e?.target)}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {options?.map(({ value, label }: { value: any; label: string }) => (
            <MenuItem key={uuid()} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      accessorFn: (row: any) => row.state,
      id: 'state',
      isSortable: true,
      header: 'State',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Select
          name="status"
          sx={{
            minWidth: 80,
            '&.Mui-focused, .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '.MuiSvgIcon-root': {
              color: '#EAECF0',
            },
          }}
          defaultValue="none"
          value={info.getValue()}
          onChange={(e) => handleChange(info?.row?._valuesCache, e?.target)}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {StatusOptions?.map(
            ({ value, label }: { value: any; label: string }) => (
              <MenuItem key={uuid()} value={value}>
                {label}
              </MenuItem>
            ),
          )}
        </Select>
      ),
    },
    {
      accessorFn: (row: any) => row.priority,
      id: 'priority',
      isSortable: true,
      header: 'Priority',
      cell: (info: any) => (
        <Select
          name="priority"
          sx={{
            minWidth: 80,
            '&.Mui-focused, .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '.MuiSvgIcon-root': {
              color: '#EAECF0',
            },
          }}
          defaultValue="none"
          value={info.getValue()}
          onChange={(e) => handleChange(info?.row?._valuesCache, e?.target)}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {priorityOptions?.map(
            ({ value, label }: { value: any; label: string }) => (
              <MenuItem key={uuid()} value={value}>
                {label}
              </MenuItem>
            ),
          )}
        </Select>
      ),
    },
  ];
};
