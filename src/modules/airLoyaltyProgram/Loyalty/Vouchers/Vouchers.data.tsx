import { Avatar, Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AntSwitch } from '@/components/AntSwitch';
import Link from 'next/link';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { EyeIcon } from '@/assets/icons';
import { UserAvatarImage } from '@/assets/images';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';

export const vouchersColumns = [
  {
    accessorFn: (row: any) => row?.information,
    id: 'information',
    header: 'Information',
    isSortable: true,
    cell: (info: any) => (
      <Box
        sx={{ display: 'flex', gap: '8px' }}
        component={Link}
        href={`${AIR_LOYALTY_PROGRAM?.VOUCHER_REDEMPTION_LIST}`}
      >
        <Avatar alt={info?.getValue()?.name}>
          <Image
            src={info?.getValue()?.src || info?.getValue()?.name}
            alt={info?.getValue()?.name}
            layout="fill"
          />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body4" color="blue.dull_blue">
            {info?.getValue()?.name}
          </Typography>
          <Typography variant="body3" color="custom.light">
            {info?.getValue()?.rewardLabel}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.vouchersUsage,
    id: 'vouchersUsage',
    cell: (info: any) => info?.getValue(),
    header: 'Vouchers usage',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          backgroundColor:
            info?.getValue() === 'Active'
              ? 'success.lighter'
              : 'custom.error_lighter',
          color: info?.getValue() === 'Active' ? 'success.main' : 'error.main',
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={info?.getValue() === 'Active' ? 'success' : 'error'}
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created at',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LocalPrintshopRoundedIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => window?.print()}
        />
        <Link href={`${AIR_LOYALTY_PROGRAM?.VOUCHER_REDEMPTION_LIST}`}>
          <EyeIcon />
        </Link>
        <AntSwitch />
      </Box>
    ),
  },
];

export const vouchersData: any = [
  {
    actions: 1,
    vouchersUsage: '119 / 250',
    information: {
      name: 'Maryam',
      rewardLabel: '50 Dollars reward',
      src: UserAvatarImage,
    },
    status: 'Expired',
    createdAt: '2023-02-28, 03:44',
  },
  {
    actions: 2,
    vouchersUsage: '2 / 250',
    information: {
      name: 'Loyal bro',
      rewardLabel: 'Loyal',
      src: UserAvatarImage,
    },
    status: 'Active',
    createdAt: '2023-02-28, 03:44',
  },
];
