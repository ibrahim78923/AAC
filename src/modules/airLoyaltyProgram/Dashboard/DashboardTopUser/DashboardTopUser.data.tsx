import { AntSwitch } from '@/components/AntSwitch';
import { Avatar, Box } from '@mui/material';
export const data: any = [
  {
    id: 6757,
    firstName: 'SevenStar',
    email: 'Star@gmail.com',
    previousCredit: '100',
    creditBalance: '50',
    creditReceived: '30',
    noOfTransactions: '30',
    tire: 'sharemydine',
    active: true,
  },
  {
    id: 1745,
    firstName: 'SevenStar',
    email: 'Star@gmail.com',
    previousCredit: '100',
    creditBalance: '50',
    creditReceived: '30',
    noOfTransactions: '30',
    tire: 'sharemydine',
    active: false,
  },
];
export const dashboardTopUserColumnsFunction = (): any => [
  {
    accessorFn: (row: any) => row?.firstName,
    id: 'firstName',
    isSortable: true,
    header: 'First Name',
    cell: (info: any) => (
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <Avatar sx={{ backgroundColor: 'gray' }} />
        {info?.getValue()}
      </Box>
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
    accessorFn: (row: any) => row?.previousCredit,
    id: 'previousCredit',
    header: 'Previous Credit',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.creditBalance,
    id: 'creditBalance',
    isSortable: false,
    header: 'Credit Balance',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.creditReceived,
    id: 'creditReceived',
    header: 'Credit Received',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.noOfTransactions,
    id: 'noOfTransactions',
    header: 'No Of Transactions',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.tire,
    id: 'tire',
    header: 'Tire',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.active,
    id: 'active',
    header: 'Active',
    isSortable: true,
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
