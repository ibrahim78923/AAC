import { AIR_SERVICES } from '@/constants';
import { Typography } from '@mui/material';

export const vendorData: any = [
  {
    Name: 'Apple',
    Email: 'johndoe@gmail.com',
    Phone: 'xyz',
    UsedBy: 'doe',
    Mobile: 'xyz',
  },
  {
    Name: 'Dell',
    Email: 'john@gmail.com',
    Phone: 'xyz',
    UsedBy: 'john',
    Mobile: 'xyz',
  },
];

export const vendorListsColumnsFunction = (router: any): any => [
  {
    accessorFn: (row: any) => row?.Name,
    id: 'Name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Typography
        component={'span'}
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.VENDOR_DETAIL,
            query: {
              vendorId: info?.row?.id,
            },
          })
        }
        sx={{ cursor: 'pointer' }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.Email,
    id: 'Email',
    header: 'Email',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Phone,
    id: 'Phone',
    isSortable: true,
    header: 'Phone',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.UsedBy,
    id: 'UsedBy',
    isSortable: true,
    header: 'UsedBy',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.Mobile,
    id: ' Mobile',
    isSortable: true,
    header: ' Mobile',
    cell: (info: any) => info?.getValue(),
  },
];
