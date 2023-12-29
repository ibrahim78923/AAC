import { Typography, Chip, IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { TrashIcon } from '@/assets/icons';

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

export const ASSETS_IMPACTS = {
  LOW: 'low',
  MEDIUM: 'medium',
};

export const associatesListsColumnFunction: any = (
  setDeleteModal: any,
  theme: any,
) => {
  const styleFunction: any = {
    [ASSETS_IMPACTS.LOW]: {
      color: 'success.main',
      bgColor: theme?.palette?.success?.lighter + 30,
    },
    [ASSETS_IMPACTS.MEDIUM]: {
      color: 'warning.main',
      bgColor: theme?.palette?.warning?.lighter + 30,
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
      cell: (info: any) => info?.getValue(),
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
            }}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.associateAssetsDetails._id,
      id: 'actions',
      cell: () => {
        return (
          <IconButton
            onClick={() => setDeleteModal(true)}
            sx={{
              cursor: 'pointer',
              marginLeft: { lg: '4%', md: '10%', sm: '18%' },
            }}
          >
            <TrashIcon />
          </IconButton>
        );
      },
    },
  ];
};
