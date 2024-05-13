import { Box, Chip, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { LOYALTY_REWARDS_TYPE } from '@/constants/strings';
import { LOYALTY_REWARDS_STATUS_PILL } from '../AllRewards/AllRewards.data';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import { truncateText } from '@/utils/avatarUtils';

export const loyaltyDigitalRewardColumnDynamic: any = (
  setIsRewardDetailsOpen: any,
  overallPermissions: any,
) => [
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    header: 'Title',
    isSortable: true,
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Typography variant="body4">
          {truncateText(info?.getValue())}
        </Typography>
      </Box>
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
    accessorFn: (row: any) => row?.vouchersDetail,
    id: 'voucherCode',
    isSortable: true,
    header: 'Voucher code',
    cell: (info: any) => info?.getValue()?.voucherCode ?? '---',
  },
  {
    accessorFn: (row: any) => row?.redeemable,
    id: 'totalRedeemable',
    header: 'Total redeemable (quantity)',
    isSortable: true,
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.redeem,
    id: 'totalRedeemed',
    header: 'Total redeemed',
    isSortable: true,
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
            rewardType: LOYALTY_REWARDS_TYPE?.DIGITAL_REWARD,
          });
        }}
      >
        {info?.getValue() ?? 0}
      </Typography>
    ),
  },
];
