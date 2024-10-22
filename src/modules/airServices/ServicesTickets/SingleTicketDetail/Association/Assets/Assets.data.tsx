import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { ASSET_IMPACT } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';
import { Box, Chip, Typography, alpha } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { DATE_TIME_FORMAT } from '@/constants';
import { AIR_SERVICES } from '@/constants/routes';
import { TruncateText } from '@/components/TruncateText';
import { splitCapitalizedWords } from '@/utils/api';
import { pxToRem } from '@/utils/getFontValue';
import { otherDateFormat } from '@/lib/date-time';

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
      accessorFn: (row: any) => row?._id,
      id: '_id',
      header: 'Assets Id',
      cell: (info: any) =>
        info?.getValue() ? `#IN - ${info?.getValue()?.slice(-3)}` : '---',
    },
    {
      accessorFn: (row: any) => row?.displayName,
      id: 'displayName',
      header: 'Asset',
      isSortable: true,
      cell: (info: any) => (
        <TruncateText text={info.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.assetLifeExpiry,
      id: 'assetLifeExpiry',
      header: 'Due Date',
      isSortable: true,
      cell: (info: any) =>
        info?.getValue()
          ? otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMMDDYYYY)
          : '---',
    },
    {
      accessorFn: (row: any) => row?.usedBy,
      id: 'usedBy',
      isSortable: true,
      header: 'Used By',
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          {fullName(
            info?.getValue()?.firstName?.toLowerCase(),
            info?.getValue()?.lastName?.toLowerCase(),
          )}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.impact,
      id: 'impact',
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
                  fontSize: pxToRem(12),
                }}
              />
            }
            label={info?.getValue()?.toLowerCase()}
            sx={{
              color: theme?.palette?.common?.black,
              backgroundColor: styleFunction?.[info?.getValue()]?.bgColor,
              textTransform: 'capitalize',
            }}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?._id,
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

export const getAssociateOrderColumns: any = ({ router, setOrderId }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.orderNumber,
      id: 'orderNumber',
      header: 'Order Number',
      cell: (info: any) => (
        <Typography variant={'body3'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase()}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.orderName,
      id: 'orderName',
      header: 'Order Name',
      isSortable: true,
      cell: (info: any) => (
        <TruncateText text={info.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.vendor?.name,
      id: 'vendor.name',
      isSortable: true,
      header: 'Vendor',
      cell: (info: any) => (
        <TruncateText text={info.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.expectedDeliveryDate,
      id: 'expectedDeliveryDate',
      header: 'Expected Delivery Date',
      isSortable: true,
      cell: (info: any) =>
        info?.getValue()
          ? otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMMDDYYYY)
          : '---',
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      header: 'Status',
      isSortable: true,
      cell: (info: any) => (
        <Typography variant={'body3'} whiteSpace={'nowrap'}>
          {splitCapitalizedWords(info?.getValue())}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?._id,
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
                    pathname: AIR_SERVICES?.ASSETS_PURCHASE_ORDER_DETAIL,
                    query: {
                      purchaseOrderId: info?.getValue(),
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
                onClick={() => setOrderId(info?.getValue())}
              />
            </PermissionsGuard>
          </Box>
        );
      },
    },
  ];
};
