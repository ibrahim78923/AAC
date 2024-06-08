import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { ASSET_IMPACT } from '@/constants/strings';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { Box, Chip, alpha } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import dayjs from 'dayjs';
import { AIR_SERVICES, DATE_TIME_FORMAT } from '@/constants';

export const TYPE_VALUES = {
  ASSETS: 'assets',
  PURCHASE_ORDER: 'purchaseOrder',
};

export const getAssociateAssetsColumns: any = ({
  theme,
  router,
  setAssetId,
}: any) => {
  const styleFunction: any = {
    [ASSET_IMPACT?.LOW]: {
      color: 'success.main',
      bgColor: alpha(theme?.palette?.success?.main, 0.1),
    },
    [ASSET_IMPACT?.MEDIUM]: {
      color: 'warning.main',
      bgColor: alpha(theme?.palette?.warning?.main, 0.1),
    },
    [ASSET_IMPACT?.HIGH]: {
      color: 'error.main',
      bgColor: alpha(theme?.palette?.error?.main, 0.1),
    },
  };
  return [
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?._id,
      id: 'associateAssetsDetails._id',
      header: 'Assets Id',
      cell: (info: any) => `#PO - ${info?.getValue()?.slice(-3)}` ?? '---',
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.displayName,
      id: 'associateAssetsDetails.displayName',
      header: 'Asset',
      isSortable: true,
      cell: (info: any) => truncateText(info?.getValue()),
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.assetLifeExpiry,
      id: 'associateAssetsDetails.assetLifeExpiry',
      header: 'Due Date',
      isSortable: true,
      cell: (info: any) =>
        dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.MMMDDYYYY),
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.userDetails,
      id: 'associateAssetsDetails.userDetails',
      isSortable: true,
      header: 'Used By',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.impact,
      id: 'associateAssetsDetails.impact',
      isSortable: true,
      header: 'Impact',
      cell: (info: any) => {
        return (
          <Chip
            icon={
              <FiberManualRecordIcon
                color={styleFunction?.[info?.getValue()]?.color}
                sx={{
                  color: styleFunction?.[info?.getValue()]?.color,
                  fontSize: '14px',
                }}
              />
            }
            label={info?.getValue()}
            sx={{
              color: theme?.palette?.common?.black,
              backgroundColor: styleFunction?.[info?.getValue()]?.bgColor,
            }}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails._id,
      id: 'Action',
      cell: (info: any) => {
        return (
          <Box display={'flex'} gap={1}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_ASSETS_DETAILS,
              ]}
            >
              <VisibilityRoundedIcon
                color={'secondary'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  router?.push({
                    pathname: AIR_SERVICES?.ASSETS_INVENTORY_DETAIL,
                    query: {
                      inventoryId: info?.getValue(),
                    },
                  })
                }
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_ASSETS,
              ]}
            >
              <CancelIcon
                color={'error'}
                sx={{ cursor: 'pointer' }}
                onClick={() => setAssetId(info?.getValue())}
              />
            </PermissionsGuard>
          </Box>
        );
      },
    },
  ];
};
