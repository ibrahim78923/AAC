import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { styles } from './InVoiceReports.style';
import { generateImage } from '@/utils/avatarUtils';

export const usersColumns: any = [
  {
    accessorFn: (row: any) => row?.owner,
    id: 'clientName',
    isSortable: true,
    header: 'Client Name',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Avatar
          alt="Remy Sharp"
          src={generateImage(info?.row?.original?.owner?.avatar?.url)}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component={'span'}>
            {info?.row?.original?.owner?.firstName}
            {info?.row?.original?.owner?.lastName}
          </Typography>
          <Typography component={'span'}>
            {info?.row?.original?.owner?.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.products?.name,
    id: 'products',
    isSortable: true,
    header: 'Products',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.planType?.name,
    id: 'planType',
    isSortable: true,
    header: 'Plan Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.details?.plans?.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    cell: (info: any) => `£ ${info?.getValue()}`,
  },
  {
    accessorFn: (row: any) => row?.invoiceNo,
    id: 'details',
    isSortable: true,
    header: 'Details',
    cell: (info: any) => `Invoices # ${info?.row?.original?.invoiceNo}`,
  },
  {
    accessorFn: (row: any) => row?.dueDate,
    id: 'dueDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.total,
    id: 'total',
    isSortable: true,
    header: 'Invoice Amount',
    cell: (info: any) => `£ ${info?.getValue()}`,
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => <Box sx={styles.statusButton}>{info?.getValue()}</Box>,
  },
];
