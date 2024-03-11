import { Typography, Chip, IconButton, alpha } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { RecycleBinIcon } from '@/assets/icons';
import { ASSET_IMPACT } from '@/constants/strings';
import { AIR_SERVICES } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

export const associatesListsData: any = [
  {
    associateAssetsDetails: {
      id: 1,
      displayName: ` Dell Laptop`,
      assetType: 'Hardware',
      usedBy: 'Devon Lane',
      impact: ASSET_IMPACT?.LOW,
    },
  },
  {
    associateAssetsDetails: {
      id: 2,
      displayName: ` Dell Mouse`,
      assetType: 'Hardware',
      usedBy: 'Devon Lane',
      impact: ASSET_IMPACT?.MEDIUM,
    },
  },
  {
    associateAssetsDetails: {
      id: 3,
      displayName: ` Dell Mouse`,
      assetType: 'Hardware',
      usedBy: 'Devon Lane',
      impact: [ASSET_IMPACT?.HIGH],
    },
  },
];

const fullName = (firstName: any, lastName: any) => {
  if (!!!firstName && !!!lastName) return '--';
  return `${firstName ?? ''} ${lastName ?? ''}`;
};

export const associatesListsColumnFunction: any = (
  theme: any,
  setAssetId: any,
  router: any,
) => {
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
      accessorFn: (row: any) => row?.associateAssetsDetails?.displayName,
      id: 'associateAssetsDetails.displayName',
      cell: (info: any) => (
        <Typography
          variant="body4"
          color={theme?.palette?.custom?.bright}
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            router?.push({
              pathname: AIR_SERVICES?.ASSETS_INVENTORY_DETAIL,
              query: {
                inventoryId: info?.row?.original?.associateAssetsDetails?._id,
              },
            })
          }
        >
          {info?.getValue()}
        </Typography>
      ),
      header: 'Asset',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.assetTypeDetails,
      id: 'associateAssetsDetails.assetType',
      isSortable: true,
      header: 'Asset Type',
      cell: (info: any) => info?.getValue()?.name ?? '---',
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.users,
      id: 'associateAssetsDetails.users',
      isSortable: true,
      header: 'Used By',
      cell: (info: any) =>
        fullName(
          info?.getValue()?.[0]?.firstName,
          info?.getValue()?.[0]?.lastName,
        ),
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
            // size="small"
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
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_ASSETS]}
          >
            <IconButton
              onClick={() => setAssetId(info?.getValue())}
              sx={{
                cursor: 'pointer',
                marginLeft: { lg: '4%', md: '10%', sm: '18%' },
              }}
            >
              <RecycleBinIcon />
            </IconButton>
          </PermissionsGuard>
        );
      },
    },
  ];
};
