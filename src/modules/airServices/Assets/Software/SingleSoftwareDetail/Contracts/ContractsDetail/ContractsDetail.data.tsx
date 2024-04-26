import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { CALENDAR_FORMAT } from '@/constants';

export const contractsTableColumns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => (
      <Box fontWeight={700} color="common.black">
        {info?.getValue()}
      </Box>
    ),
    header: 'Contract Name',
  },
  {
    accessorFn: (row: any) => row?.licenseType,
    id: 'licenseType',
    header: 'License Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.licensesCount,
    id: 'licensesCount',
    header: 'No of Licenses',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'endDate',
    header: 'Expiry Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(CALENDAR_FORMAT?.UI),
  },
];
