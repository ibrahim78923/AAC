import { Box, Typography } from '@mui/material';

export const data: any = [
  {
    id: 1,
    contractName: 'Sample Apple Contract',
    type: 'Lease',
    status: 'Active',
    renewalStatus: 'Pending',
    contractNumber: 'CNTR-1',
    expiry: '3 May,2024',
  },
];
export const columns = (): any => [
  {
    accessorFn: (row: any) => row?.contractName,
    id: 'contractName',
    isSortable: true,
    header: 'Contract Name',
    cell: (info: any) => (
      <Typography fontWeight={600}> {info?.getValue()}</Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
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
      <Box
        color="success.main"
        borderRadius={3}
        width={'4rem'}
        textAlign={'center'}
        sx={{ backgroundColor: 'success.lighter' }}
      >
        {info?.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.renewalStatus,
    id: 'renewalStatus',
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
    accessorFn: (row: any) => row?.expiry,
    id: 'expiry',
    isSortable: true,
    header: 'Expiry',
    cell: (info: any) => info?.getValue(),
  },
];
