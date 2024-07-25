import { Avatar, Box, Theme, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { styles } from './InVoiceReports.style';
import { generateImage } from '@/utils/avatarUtils';
import { RowInterface } from '../Reports.interface';
import { capitalizeFirstLetter } from '@/utils/api';

export const usersColumns = (theme: Theme) => {
  return [
    {
      accessorFn: (row: RowInterface) => row?.owner,
      id: 'clientName',
      isSortable: true,
      header: 'Client Name',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar
            alt="Remy Sharp"
            src={generateImage(info?.row?.original?.owner?.avatar?.url)}
            sx={{
              color: theme?.palette?.grey[600],
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {capitalizeFirstLetter(
              info?.row?.original?.owner?.firstName?.charAt(0),
            )}
            {capitalizeFirstLetter(
              info?.row?.original?.owner?.firstName?.charAt(0),
            )}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>
              {`${capitalizeFirstLetter(
                info?.row?.original?.owner?.firstName,
              )} ${capitalizeFirstLetter(
                info?.row?.original?.owner?.lastName,
              )}`}
            </Typography>
            <Typography component={'span'}>
              {info?.row?.original?.owner?.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      accessorFn: (row: RowInterface) => row?.products?.name,
      id: 'products',
      isSortable: true,
      header: 'Products',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()),
    },
    {
      accessorFn: (row: RowInterface) => row?.planType?.name,
      id: 'planType',
      isSortable: true,
      header: 'Plan Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: RowInterface) => row?.details?.plans?.planPrice,
      id: 'planPrice',
      isSortable: true,
      header: 'Plan Price',
      cell: (info: any) => `£ ${info?.getValue()}`,
    },
    {
      accessorFn: (row: RowInterface) => row?.invoiceNo,
      id: 'details',
      isSortable: true,
      header: 'Details',
      cell: (info: any) => `Invoices # ${info?.row?.original?.invoiceNo}`,
    },
    {
      accessorFn: (row: RowInterface) => row?.dueDate,
      id: 'dueDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: RowInterface) => row?.total,
      id: 'total',
      isSortable: true,
      header: 'Invoice Amount',
      cell: (info: any) => `£ ${info?.getValue()}`,
    },
    {
      accessorFn: (row: RowInterface) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Box sx={styles.statusButton}>{info?.getValue()}</Box>
      ),
    },
  ];
};
