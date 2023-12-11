import { Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export const detailsData: any = [
  {
    Id: 1,
    Name: 'Joesph',
    PhoneNumber: '(219)555-0114',
    Status: 'Failed',
  },
  {
    Id: 2,
    Name: 'Steven Wilson',
    PhoneNumber: '(219)555-0124',
    Status: 'Replied',
  },
  {
    Id: 3,
    Name: 'Robert Johnson',
    PhoneNumber: '(671)555-0110',
    Status: 'Delivered',
  },
  {
    Id: 4,
    Name: 'David Jones',
    PhoneNumber: '(316)555-0116',
    Status: 'Failed',
  },
];

export const detailsColumns: any = (handleDelete: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Name,
      id: 'name',
      isSortable: false,
      header: 'Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.PhoneNumber,
      id: 'phoneNumber',
      isSortable: false,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.Status,
      id: 'status',
      isSortable: false,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.Actions,
      id: 'action',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box
          onClick={() => handleDelete()}
          sx={{
            background: '#F3F4F6',
            width: 'fit-content',
            borderRadius: '100%',
            p: 1,
            cursor: 'pointer',
          }}
        >
          <DeleteIcon />
        </Box>
      ),
    },
  ];
};
