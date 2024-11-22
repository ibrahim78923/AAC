import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { TruncateText } from '@/components/TruncateText';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';

const menuItemDataArray = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'EXPIRED', label: 'Expired' },
];

export const loyaltyRewardColumnDynamic: any = (
  setIsRewardDetailsOpen: any,
  activePermissionOfEditDelete: any,
  overallPermissions: any,
  setIsRewardDrawerOpen: any,
  setIsRewardDelete: any,
) => {
  const columns = [
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      header: 'Reward Title',
      isSortable: true,
      cell: (info: any) => <TruncateText text={info?.getValue()} />,
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
      cell: (info: any) => {
        const status = info?.getValue()?.toUpperCase();
        return (
          <ActivityStatusMenu
            info={info}
            activityStatus={status}
            menuItemDataArray={menuItemDataArray}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: (info: any) => info?.getValue()?.voucherCode ?? '---',
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
                AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.VIEW_REWARD_DETAILS,
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
  ];
  if (activePermissionOfEditDelete) {
    columns?.push({
      accessorFn: (row: any) => row?.actions,
      id: 'actions',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.EDIT_DELETE_REWARDS,
            ]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setIsRewardDrawerOpen({
                  data: info?.row?.original?._id,
                  isOpen: true,
                })
              }
            >
              <EditPenIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setIsRewardDelete({
                  data: info?.row?.original?._id,
                  isOpen: true,
                })
              }
            >
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    });
  }
  return columns;
};
