import { REQUESTORS_STATUS } from '@/constants/strings';
import { Avatar, Box, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
    status: 'Active',
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
    status: 'Active',
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
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          backgroundColor:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.lighter'
              : 'custom.error_lighter',
          color:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.main'
              : 'error.main',
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={
              info?.getValue()?.toLowerCase() ===
              REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
                ? 'success'
                : 'error'
            }
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
];
