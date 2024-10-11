import { TruncateText } from '@/components/TruncateText';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { LOYALTY_CONSUMER_STATUS } from '@/constants/strings';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

const active = true;
export const ConsumerData = () => [
  {
    id: 1,
    avatar: '',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: active
      ? LOYALTY_CONSUMER_STATUS?.ACTIVE
      : LOYALTY_CONSUMER_STATUS?.INACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
  {
    id: 14440,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: active
      ? LOYALTY_CONSUMER_STATUS?.ACTIVE
      : LOYALTY_CONSUMER_STATUS?.INACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
  {
    id: 114,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: active
      ? LOYALTY_CONSUMER_STATUS?.ACTIVE
      : LOYALTY_CONSUMER_STATUS?.INACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
  {
    id: 144,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: active
      ? LOYALTY_CONSUMER_STATUS?.ACTIVE
      : LOYALTY_CONSUMER_STATUS?.INACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
  {
    id: 14,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, New York, NY 10001',
    phone: '1234567890',
    status: active
      ? LOYALTY_CONSUMER_STATUS?.ACTIVE
      : LOYALTY_CONSUMER_STATUS?.INACTIVE,
    totalPointsEarned: '100',
    currentPointsBalance: '100',
    noOfTransactions: '10',
    firstPointsReceptionDate: '2021-10-10',
    lastTransactionDate: '2021-10-10',
    tier: 'Gold',
  },
];
export const getConsumerColumns = () => [
  {
    accessorFn: (row: any) => row?.firstName,
    id: 'firstName',
    isSortable: true,
    header: 'Consumer',
    cell: (info: any) => {
      const router = useRouter();
      const handleClick = () => {
        router.push({
          pathname: AIR_LOYALTY_PROGRAM.UPSERT_CONSUMER,
        });
      };

      return (
        <Typography
          onClick={handleClick} // Attach event handler
          style={{ cursor: 'pointer' }}
        >
          <TruncateText text={info.getValue()} />
        </Typography>
      );
    },
  },
  {
    accessorFn: (row: any) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => <TruncateText text={info.getValue()} />,
  },
  {
    accessorFn: (row: any) => row?.phone,
    id: 'phone',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.totalPointsEarned,
    id: 'totalPointsEarned',
    isSortable: true,
    header: 'Total Points Earned',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.currentPointsBalance,
    id: 'currentPointsBalance',
    isSortable: true,
    header: 'Current Points Balance',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.noOfTransactions,
    id: 'noOfTransactions',
    isSortable: true,
    header: 'No of Transactions',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.firstPointsReceptionDate,
    id: 'firstPointsReceptionDate',
    isSortable: true,
    header: 'First Points Reception Date',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.lastTransactionDate,
    id: 'lastTransactionDate',
    isSortable: true,
    header: 'Last Transaction Date',
    cell: (info: any) => {
      info.getValue();
    },
  },
  {
    accessorFn: (row: any) => row?.tier,
    id: 'tier',
    isSortable: true,
    header: 'Tier',
    cell: (info: any) => {
      info.getValue();
    },
  },
];
