import { Avatar, Box, Chip, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';

export const loyaltyAllRewardColumnDynamic: any = () => [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    header: 'Title',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          src={info?.row?.original?.icon?.src}
          alt={info?.row?.original?.icon?.name}
        />{' '}
        <Typography
          variant="body4"
          sx={{
            color: 'blue.dull_blue',
          }}
        >
          {info?.getValue()}
        </Typography>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.requiredPoints,
    id: 'requiredPoints',
    isSortable: true,
    header: 'Required Points',
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
          bgcolor: 'success.lighter',
          color: 'success.main',
        }}
        icon={<Circle color={'success'} sx={{ fontSize: '0.7rem' }} />}
        label={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.totalRedeemable,
    id: 'totalRedeemable',
    isSortable: true,
    header: 'Total redeemable (quantity)',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.voucherCode,
    id: 'voucherCode',
    isSortable: true,
    header: 'Voucher code',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.rewardType,
    id: 'rewardType',
    isSortable: true,
    header: 'Reward Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.totalRedeemed,
    id: 'totalRedeemed',
    isSortable: true,
    header: 'Total redeemed',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.cost,
    id: 'cost',
    isSortable: true,
    header: 'Cost',
    cell: (info: any) => info?.getValue(),
  },
];
