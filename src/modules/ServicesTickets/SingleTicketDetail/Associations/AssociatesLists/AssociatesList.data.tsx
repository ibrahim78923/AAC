import { Typography, Chip, Checkbox } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
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
const styleFunction: any = {
  Low: {
    color: 'green',
    bgColor: 'green',
  },
  Medium: {
    color: 'green',
    bgColor: 'green',
  },
};
export const associatesListsColumnFunction: any = (
  theme: any,
  router: any,
  associatesData: any,
  setAssociatesData: any,
  associatedAllData: any,
) => {
  return [
    {
      accessorFn: (row: any) => row.id,
      id: 'id',
      cell: (info: any) => (
        <Checkbox
          checked={
            !!associatesData.find((item: any) => item.id === info.getValue())
          }
          onChange={(e: any) => {
            e.target.checked
              ? setAssociatesData([
                  ...associatesData,
                  associatedAllData.find(
                    (item: any) => item.id === info.getValue(),
                  ),
                ])
              : setAssociatesData(
                  associatesData.filter((item: any) => {
                    return item.id !== info.getValue();
                  }),
                );
          }}
          color="primary"
          name={info.getValue()}
        />
      ),
      header: (
        <Checkbox
          checked={associatesData.length === associatedAllData.length}
          onChange={(e: any) => {
            e.target.checked
              ? setAssociatesData([...associatedAllData])
              : setAssociatesData([]);
          }}
          color="primary"
          name="id"
        />
      ),
      isSortable: false,
    },
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
      cell: (info: any) => {
        return (
          <Chip
            icon={
              <FiberManualRecordIcon
                sx={{ color: styleFunction?.[info.getValue()]?.color }}
              />
            }
            size="small"
            label={info.getValue()}
            sx={{
              bgColor: styleFunction?.[info.getValue()]?.bgColor,
              color: theme.palette.common.white,
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
          <DeleteIcon
            // onClick={() => console.error(info.getValue())}
            sx={{ cursor: 'pointer' }}
          />
        );
      },
    },
  ];
};
