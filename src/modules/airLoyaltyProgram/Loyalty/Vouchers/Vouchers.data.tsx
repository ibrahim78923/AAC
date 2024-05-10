import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AntSwitch } from '@/components/AntSwitch';
import Link from 'next/link';
import { AIR_LOYALTY_PROGRAM, DATE_TIME_FORMAT } from '@/constants';
import { EyeIcon } from '@/assets/icons';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import { VOUCHERS_STATUS } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import dayjs from 'dayjs';
import { truncateText } from '@/utils/avatarUtils';

export const vouchersColumns = (
  onSwitchChange: any,
  switchLoading: any,
  handlePrintVoucher: any,
) => [
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body4" color="blue.dull_blue">
            {truncateText(info?.row?.original?.name) ?? '---'}
          </Typography>
          <Typography variant="body3" color="custom.light">
            {truncateText(info?.row?.original?.description) ?? '---'}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.voucherUsage,
    id: 'voucherUsage',
    header: 'Vouchers usage',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'}>
        <Typography fontSize={'0.9rem'}>
          {info?.row?.original?.voucherValue ?? '---'}
        </Typography>
        {'/'}
        <Typography fontSize={'0.9rem'}>
          {info?.row?.original?.voucherLimitValue ?? '---'}
        </Typography>
      </Box>
    ),
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
            info?.getValue() === VOUCHERS_STATUS?.EXPIRED
              ? 'custom.color.lighter'
              : info?.getValue() === VOUCHERS_STATUS?.ACTIVE
                ? 'success.lighter'
                : 'custom.error_lighter',

          color:
            info?.getValue() === VOUCHERS_STATUS?.EXPIRED
              ? 'custom.main'
              : info?.getValue() === VOUCHERS_STATUS?.ACTIVE
                ? 'success.main'
                : 'error.main',
          fontSize: '0.8rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={
              info?.getValue() === VOUCHERS_STATUS?.EXPIRED
                ? 'secondary'
                : info?.getValue() === VOUCHERS_STATUS?.ACTIVE
                  ? 'success'
                  : 'error'
            }
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue() ?? '---'}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created at',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.YMDHM) ?? '---',
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Actions',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PermissionsGuard
          permissions={[AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.PRINT]}
        >
          <LocalPrintshopRoundedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => handlePrintVoucher(info?.row?.original?._id)}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS]}
        >
          <Link href={`${AIR_LOYALTY_PROGRAM?.VOUCHER_REDEMPTION_LIST}`}>
            <EyeIcon />
          </Link>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.ACTIVE_DEACTIVATE_VOUCHERS,
          ]}
        >
          {switchLoading[info?.row?.original?._id] ? (
            <CircularProgress size={20} sx={{ ml: 0.5 }} />
          ) : (
            <AntSwitch
              disabled={
                info?.row?.original?.status === VOUCHERS_STATUS?.EXPIRED
                  ? true
                  : false
              }
              onChange={() => onSwitchChange(info?.row?.original)}
              checked={
                info?.row?.original?.status === VOUCHERS_STATUS?.ACTIVE
                  ? true
                  : false
              }
            />
          )}
        </PermissionsGuard>
      </Box>
    ),
  },
];
