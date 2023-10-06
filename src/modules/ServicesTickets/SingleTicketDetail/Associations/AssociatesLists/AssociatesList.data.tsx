import { Typography, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
export const associatesListsColumnFunction: any = (theme: any, router: any) => {
  return [
    // {
    //   accessorFn: (row: any) => row.id,
    //   id: 'id',
    //   cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
    //   header: <Checkbox color="primary" name="id" />,
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => row.asset,
      id: 'asset',
      cell: (info: any) => (
        <Typography
          style={{
            color: '#0AADC7',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push({
              pathname: `${router.pathname}/detail`,
              query: {
                id: info.getValue(),
              },
            });
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
      cell: (info: any) => (
        <Chip
          icon={<FiberManualRecordIcon />}
          size="small"
          label={info.getValue()}
          sx={{
            bgcolor: `${theme['palette']['primary']['main']}`,
            color: theme.palette.common.white,
          }}
        />
      ),
    },
  ];
};
