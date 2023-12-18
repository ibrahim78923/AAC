import { Avatar, Box, Chip, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { AvatarImage } from '@/assets/images';

export const digitalTableData = [
  {
    id: 1,
    title: `You won 50 pts!`,
    requiredPoints: 500,
    status: 'Active',
    voucherCode: `PK140`,
    totalRedeemed: 10,
    total_redeemable: 20,
    icon: AvatarImage,
  },
  {
    id: 2,
    title: `Double point day`,
    requiredPoints: 120,
    status: 'Active',
    voucherCode: `BF20`,
    totalRedeemed: 10,
    total_redeemable: 163,
    icon: AvatarImage,
  },
  {
    id: 3,
    title: `You won 50 pts!`,
    requiredPoints: 150,
    status: 'Active',
    voucherCode: `NEWYR23`,
    totalRedeemed: 10,
    total_redeemable: 250,
    icon: AvatarImage,
  },
];
export const UserList: any = (push: any) => [
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
        <Typography variant="body4">{info?.getValue()}</Typography>
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
    accessorFn: (row: any) => row?.voucherCode,
    id: 'voucherCode',
    isSortable: true,
    header: 'Voucher code',
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
    accessorFn: (row: any) => row?.total_redeemable,
    id: 'total_redeemable',
    isSortable: true,
    header: 'Total redeemable (quantity)',
    cell: (info: any) => (
      <Typography
        variant="body4"
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          push({
            pathname: AIR_LOYALTY_PROGRAM?.DIGITAL_REWARDS_DETAIL,
            query: `id=${info?.row?.original?.id}`,
          })
        }
      >
        {info?.getValue()}
      </Typography>
    ),
  },
];
