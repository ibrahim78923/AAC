import { Box, Chip, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { LOYALTY_REWARDS_STATUS } from '@/constants/strings';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import { fullName } from '@/utils/avatarUtils';
import { LOYALTY_REWARDS_TYPE_MAPPED } from '@/constants/api-mapped';
import { UserInfo } from '@/components/UserInfo';
import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';

export const LOYALTY_REWARDS_STATUS_PILL: any = {
  [LOYALTY_REWARDS_STATUS?.ACTIVE]: {
    fontColor: 'success.main',
    bgColor: 'success.lighter',
    iconColor: 'success',
  },
  [LOYALTY_REWARDS_STATUS?.EXPIRED]: {
    fontColor: 'error.main',
    bgColor: 'custom.error_lighter',
    iconColor: 'error',
  },
};

export const loyaltyRewardColumnDynamic: any = (
  setIsRewardDetailsOpen: any,
  overallPermissions: any,
) => [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    header: 'Reward Title',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        name={fullName(info?.row?.original?.icon?.name)}
        avatarSrc={info?.row?.original?.rewardAttachment?.fileUrl}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.requiredPoints,
    id: 'requiredPoints',
    isSortable: true,
    header: 'Required Points',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          bgcolor: LOYALTY_REWARDS_STATUS_PILL?.[info?.getValue()]?.bgColor,
          color: LOYALTY_REWARDS_STATUS_PILL?.[info?.getValue()]?.fontColor,
        }}
        icon={
          <Circle
            color={LOYALTY_REWARDS_STATUS_PILL?.[info?.getValue()]?.iconColor}
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.redeemable,
    id: 'totalRedeemable',
    isSortable: true,
    header: 'Total redeemable (quantity)',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.vouchersDetail,
    id: 'voucherCode',
    isSortable: true,
    header: 'Voucher code',
    cell: (info: any) => info?.getValue()?.voucherCode ?? '---',
  },
  {
    accessorFn: (row: any) => row?.rewardType,
    id: 'rewardType',
    isSortable: true,
    header: 'Reward Type',
    cell: (info: any) => LOYALTY_REWARDS_TYPE_MAPPED?.[info?.getValue()],
  },
  {
    accessorFn: (row: any) => row?.totalRedeemed,
    id: 'totalRedeemed',
    isSortable: true,
    header: 'Total redeemed',
    cell: (info: any) => (
      <Typography
        variant="body4"
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          if (
            !overallPermissions?.includes(
              AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.VIEW_REWARDS_DETAILS,
            )
          )
            return;
          setIsRewardDetailsOpen?.({
            isOpen: true,
            rewardType: info?.row?.original?.rewardType,
          });
        }}
      >
        {info?.getValue() ?? 0}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.cost,
    id: 'cost',
    isSortable: true,
    header: 'Cost',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created at',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: () => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ cursor: 'pointer' }}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
