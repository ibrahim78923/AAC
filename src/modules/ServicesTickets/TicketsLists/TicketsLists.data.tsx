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
    value: 'test1',
    label: 'Test1',
  },
  {
    value: 'test2',
    label: 'Test2',
  },
  {
    value: 'test3',
    label: 'Test3',
  },
];

export const ticketsListsData: any = [
  {
    id: 1,
    ticketId: ` #717`,
    ticketName: 'Drafts',
    requester: 'Sharemydine',
    assignedTo: 'test1',
    status: 'test2',
    state: 'Tech Support',
    priority: 'test1',
  },
  {
    id: 2,
    ticketId: ` #787`,
    ticketName: 'rafts',
    requester: 'Sharemydine',
    assignedTo: 'test2',
    state: 'Tech Support',
    status: 'test3',
    priority: 'test1',
  },
  {
    id: 3,
    ticketId: ` #917`,
    ticketName: 'fts',
    requester: 'Sharemydine',
    assignedTo: 'test3',
    state: 'Tech Support',
    status: 'test1',
    priority: 'test3',
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
          {options?.map(({ value, label }: { value: any; label: string }) => (
            <MenuItem key={uuid()} value={value}>
              {label}
            </MenuItem>
          ))}
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
          {options?.map(({ value, label }: { value: any; label: string }) => (
            <MenuItem key={uuid()} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];
};
