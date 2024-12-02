import { Box, IconButton, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import RewardStatus from './RewardStatus';
import { otherDateFormat } from '@/lib/date-time';
import { DATE_TIME_FORMAT } from '@/constants';
import { LOYALTY_REWARDS_STATUS } from '@/constants/strings';
import { UserInfo } from '@/components/UserInfo';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';

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
      cell: (info: any) => (
        <UserInfo
          nameInitial={fullNameInitial(info?.row?.original?.title)}
          name={fullName(info?.row?.original.title)}
          avatarSrc={info?.row?.original?.rewardAttachment}
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
      cell: (info: any) => {
        const status = info?.getValue()?.toUpperCase();
        return <RewardStatus info={info} status={status} />;
      },
    },
    {
      accessorFn: (row: any) => row?.quantity,
      id: 'quantity',
      isSortable: true,
      header: 'Quantity',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.redeemedQuantity,
      id: 'redeemedQuantity',
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
              rewardType: info?.row?.original?._id,
            });
          }}
        >
          {info?.getValue() ?? 0}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.costPrice,
      id: 'costPrice',
      isSortable: true,
      header: 'Cost',
      cell: (info: any) => info?.getValue() ?? '---',
    },
    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created at',
      cell: (info: any) =>
        info?.getValue()
          ? otherDateFormat(
              info?.getValue(),
              DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A,
            )
          : '---',
    },
  ];
  if (activePermissionOfEditDelete) {
    columns?.push({
      accessorFn: (row: any) => row?.actions,
      id: 'actions',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <Box sx={{ display: 'flex' }}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.EDIT_DELETE_REWARDS,
            ]}
          >
            <IconButton
              disabled={
                info?.row?.original?.status === LOYALTY_REWARDS_STATUS?.EXPIRED
              }
              onClick={() =>
                setIsRewardDrawerOpen({
                  data: info?.row?.original?._id,
                  isOpen: true,
                })
              }
            >
              <EditPenIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                setIsRewardDelete({
                  data: info?.row?.original?._id,
                  isOpen: true,
                })
              }
            >
              <DeleteCrossIcon />
            </IconButton>
          </PermissionsGuard>
        </Box>
      ),
    });
  }
  return columns;
};
