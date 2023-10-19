import { Typography, Chip, IconButton } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { TrashIcon } from '@/assets/icons';
import { useTheme } from '@mui/material';
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
  LOW: 'Low',
  MEDIUM: 'Medium',
};
const styleFunction: any = {
  [ASSETS_IMPACTS.LOW]: {
    color: 'success.main',
    bgColor: '#47B2631A',
  },
  [ASSETS_IMPACTS.MEDIUM]: {
    color: 'warning.light',
    bgColor: '#FFC20E1A',
  },
};
export const associatesListsColumnFunction: any = (setDeleteModal: any) => {
  const theme = useTheme();
  return [
    {
      accessorFn: (row: any) => row.asset,
      id: 'asset',
      cell: (info: any) => (
        <Typography
          style={{
            color: '#0AADC7',
          }}
        >
          {info.getValue()}
        </Typography>
      ),
      header: 'Asset',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.assetType,
      id: 'assetType',
      isSortable: true,
      header: 'Asset Type',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.usedBy,
      id: 'usedBy',
      isSortable: true,
      header: 'Used By',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.impact,
      id: 'impact',
      isSortable: true,
      header: 'Impact',
      cell: (info: any) => {
        return (
          <Chip
            icon={
              <FiberManualRecordIcon
                color={styleFunction?.[info.getValue()]?.color}
                sx={{ color: styleFunction?.[info.getValue()]?.color }}
              />
            }
            size="small"
            label={info.getValue()}
            sx={{
              backgroundColor: styleFunction?.[info.getValue()]?.bgColor,
              color: theme.palette.common.black,
            }}
          />
        );
      },
    },
    {
      accessorFn: (row: any) => row?.id,
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
