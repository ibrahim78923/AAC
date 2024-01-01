import { Typography, Chip, IconButton, alpha } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { RecycleBinIcon } from '@/assets/icons';
import { ASSET_IMPACT } from '@/constants/strings';

export const associatesListsData: any = [
  {
    id: 1,
    asset: ` Dell Laptop`,
    assetType: 'Hardware',
    usedBy: 'Devon Lane',
    impact: 'Low',
  },
  {
    id: 2,
    asset: ` Dell Mouse`,
    assetType: 'Hardware',
    usedBy: 'Devon Lane',
    impact: 'Medium',
  },
];

const fullName = (firstName: any, lastName: any) => {
  if (!!!firstName && !!!lastName) return '--';
  return `${firstName ?? ''} ${lastName ?? ''}`;
};

export const associatesListsColumnFunction: any = (
  theme: any,
  setAssetId: any,
) => {
  const styleFunction: any = {
    [ASSET_IMPACT?.LOW]: {
      color: 'success.main',
      bgColor: alpha(theme?.palette?.success?.lighter, 0.6),
    },
    [ASSET_IMPACT?.MEDIUM]: {
      color: 'warning.main',
      bgColor: alpha(theme?.palette?.warning?.lighter, 0.6),
    },
    [ASSET_IMPACT?.HIGH]: {
      color: 'error.main',
      bgColor: alpha(theme?.palette?.error?.lighter, 0.1),
    },
  };
  return [
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.displayName,
      id: 'associateAssetsDetails.displayName',
      cell: (info: any) => (
        <Typography variant="body4" color={theme?.palette?.custom?.bright}>
          {info?.getValue()}
        </Typography>
      ),
      header: 'Asset',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.assetType,
      id: 'associateAssetsDetails.assetType',
      isSortable: true,
      header: 'Asset Type',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails?.usedBy,
      id: 'associateAssetsDetails.usedBy',
      isSortable: true,
      header: 'Used By',
      cell: (info: any) =>
        fullName(
          info?.row?.original?.user?.firstName,
          info?.row?.original?.user?.lastName,
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
                sx={{ color: styleFunction?.[info?.getValue()]?.color }}
              />
            }
            size="small"
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
          <IconButton
            onClick={() => setAssetId(info?.getValue())}
            sx={{
              cursor: 'pointer',
              marginLeft: { lg: '4%', md: '10%', sm: '18%' },
            }}
          >
            <RecycleBinIcon />
          </IconButton>
        );
      },
    },
  ];
};
