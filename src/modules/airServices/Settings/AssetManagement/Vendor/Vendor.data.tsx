import { AIR_SERVICES } from '@/constants';
import { Typography } from '@mui/material';

export const PRODUCT_LISTS_ACTION_CONSTANTS = {
  IMPORT: 'import',
};
export const vendorListsColumnsFunction = (router: any): any => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Typography
        component={'span'}
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.VENDOR_DETAIL,
            query: {
              vendorId: info?.row?.original?._id,
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
    id: 'email',
    header: 'Email',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.phone,
    id: 'phone',
    isSortable: true,
    header: 'Phone',
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
