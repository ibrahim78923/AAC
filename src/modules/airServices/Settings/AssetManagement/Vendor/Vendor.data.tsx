import { AIR_SERVICES } from '@/constants';
import { Typography } from '@mui/material';

export const vendorData: any = [
  {
    name: 'apple',
    email: 'johndoe@gmail.com',
    phone: '12345',
    usedBy: 'doe',
    mobile: '00000',
  },
  {
    name: 'dell',
    email: 'john@gmail.com',
    phone: 'xyz',
    usedBy: 'john',
    mobile: 'xyz',
  },
];

export const vendorListsColumnsFunction = (router: any): any => [
  {
    accessorFn: (row: any) => row?.name,
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
    accessorFn: (row: any) => row?.email,
    id: 'Email',
    header: 'Email',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.phone,
    id: 'Phone',
    isSortable: true,
    header: 'Phone',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.usedBy,
    id: 'UsedBy',
    isSortable: true,
    header: 'UsedBy',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.mobile,
    id: ' Mobile',
    isSortable: true,
    header: ' Mobile',
    cell: (info: any) => info?.getValue(),
  },
];
