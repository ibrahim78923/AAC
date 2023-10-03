import { AvatarImage } from '@/assets/images';
import { Box, Checkbox } from '@mui/material';
import Image from 'next/image';

export const TABLE_CONSTANTS = {
  CUSTOMIZE_COLUMN: 'customize-column',
  FILTER_DATA: 'filter-data',
  BULK_UPDATE_DATA: 'bulk-update-data',
  CREATE_NEW_TICKET: 'create-new-ticket',
};

export const ticketsListsData: any = [
  {
    id: 1,
    ticketId: ` #717`,
    ticketName: 'Drafts',
    requester: 'Sharemydine',
    assignedTo: 'Alee',
    state: 'Tech Support',
    status: 'Drafts',
    priority: 'Sharemydine',
  },
  {
    id: 2,
    ticketId: ` #787`,
    ticketName: 'rafts',
    requester: 'Sharemydine',
    assignedTo: 'Alee',
    state: 'Tech Support',
    status: 'Drafts',
    priority: 'Sharemydine',
  },
  {
    id: 3,
    ticketId: ` #917`,
    ticketName: 'fts',
    requester: 'Sharemydine',
    assignedTo: 'Alee',
    state: 'Tech Support',
    status: 'Drafts',
    priority: 'Sharemydine',
  },
];
export const ticketsListsColumnFunction: any = (theme: any, router: any) => {
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
      isSortable: false,
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
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.state,
      id: 'state',
      isSortable: true,
      header: 'State',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.priority,
      id: 'priority',
      isSortable: true,
      header: 'Priority',
      cell: (info: any) => info.getValue(),
    },
  ];
};
