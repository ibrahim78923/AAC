import { Chip, Typography } from '@mui/material';
import { format } from 'date-fns';

export const contractColumns = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Contract Name',
    cell: (info: any) => (
      <Typography fontWeight={600}> {info?.getValue()}</Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.contractType,
    id: 'contractType',
    header: 'Type',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          bgcolor:
            info?.getValue() === 'APPROVED'
              ? 'success.lighter'
              : 'error.lighter',
          color:
            info?.getValue() === 'APPROVED' ? 'success.main' : 'error.main',
        }}
        label={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.statusRenewExtend,
    id: 'statusRenewExtend',
    isSortable: true,
    header: 'Renewal Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.contractNumber,
    id: 'contractNumber',
    isSortable: true,
    header: 'Contract Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.endDate,
    id: 'endDate',
    isSortable: true,
    header: 'Expiry',
    cell: (info: any) => {
      const dateValue = info?.getValue();
      if (dateValue) {
        return format(new Date(dateValue), 'd MMM yyyy');
      }
      return null;
    },
  },
];
