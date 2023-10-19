import { v4 as uuid } from 'uuid';
import { AvatarImage } from '@/assets/images';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Checkbox,
  Select,
  MenuItem,
  Avatar,
  Typography,
} from '@mui/material';

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
    requester: { name: 'Sophie Baxter', profileImg: AvatarImage },
    assignedTo: 'user1',
    status: 'open',
    state: 'New',
    priority: 'high',
  },
  {
    id: 2,
    ticketId: ` #787`,
    ticketName: 'rafts',
    requester: { name: 'Cameron Williamson', profileImg: null },
    assignedTo: 'user2',
    state: 'Response Due',
    status: 'pending',
    priority: 'low',
  },
  {
    id: 3,
    ticketId: ` #917`,
    ticketName: 'fts',
    requester: { name: 'Leslie Alexander', profileImg: '' },
    assignedTo: 'user3',
    state: 'Overdue',
    status: 'closed',
    priority: 'medium',
  },
];

export const ticketsListsColumnFunction: any = (
  theme: any,
  router: any,
  ticketList: any,
  selectedTicketList: any,
  setSelectedTicketList: any,
  handleChange: (value: any, event: any) => void,
) => {
  const { palette } = useTheme();
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          checked={
            !!selectedTicketList.find(
              (item: any) => item.id === info.getValue(),
            )
          }
          onChange={(e: any) => {
            e.target.checked
              ? setSelectedTicketList([
                  ...selectedTicketList,
                  ticketList.find((item: any) => item.id === info.getValue()),
                ])
              : setSelectedTicketList(
                  selectedTicketList.filter((item: any) => {
                    return item.id !== info.getValue();
                  }),
                );
          }}
          color="primary"
          name={info.getValue()}
        />
      ),
      header: (
        <Checkbox
          checked={selectedTicketList.length === ticketList.length}
          onChange={(e: any) => {
            e.target.checked
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
      accessorFn: (row: any) => row.ticketId,
      id: 'ticketId',
      cell: (info: any) => (
        <Box display={'flex'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
          <Avatar
            sx={{ bgcolor: palette?.blue?.main, borderRadius: 1.25 }}
            style={{ width: 28, height: 28 }}
          >
            IT
          </Avatar>
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
          <Avatar
            sx={{ bgcolor: palette?.blue?.main }}
            style={{ width: 24, height: 24 }}
            src={info.getValue()?.profileImg?.src}
          >
            <Typography component="span" fontSize={10} fontWeight={500}>
              {info.getValue()?.name?.split(' ')?.[0][0]}
              {info.getValue()?.name?.split(' ')?.[1][0]}
            </Typography>
          </Avatar>
          {info.getValue()?.name}
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
              color: palette?.custom?.off_white_three,
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
              color: palette?.custom?.off_white_three,
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
              color: palette?.custom?.off_white_three,
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
