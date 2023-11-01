import { AIR_SERVICES } from '@/constants';
import { Checkbox, Typography } from '@mui/material';

export const data: any = [
  {
    id: 1,
    Name: 'Logitech Mouse',
    AssetType: 'Hardware',
    Location: '---',
    UsedBy: '---',
    Department: '---',
    Impact: 'Low',
  },
  {
    id: 2,
    Name: 'Dell Monitor',
    AssetType: 'Hardware',
    Location: '---',
    UsedBy: '---',
    Department: '---',
    Impact: 'Low',
  },
  {
    id: 3,
    Name: 'Andrea’s Laptop',
    AssetType: `Hardware`,
    Location: '---',
    UsedBy: 'Andrea',
    Department: '---',
    Impact: 'Medium',
  },
];
export const inventoryListsColumnsFunction = (
  inventoryData: any,
  setInventoryData: any,
  data: any,
  theme: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!inventoryData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setInventoryData([
                ...inventoryData,
                data.find((item: any) => item.id === info.getValue()),
              ])
            : setInventoryData(
                inventoryData.filter((item: any) => {
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
        checked={inventoryData.length === data.length}
        onChange={(e: any) => {
          e.target.checked ? setInventoryData([...data]) : setInventoryData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Name,
    id: 'Name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Typography
        component={'span'}
        onClick={() =>
          router.push({
            pathname: AIR_SERVICES?.ASSETS_INVENTORY_DETAIL,
            query: {
              inventoryId: info?.row?.id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {info.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row.AssetType,
    id: 'AssetType',
    header: 'Asset Type',
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Location,
    id: 'Location',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.UsedBy,
    id: 'UsedBy',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Department,
    id: 'Department',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Impact,
    id: 'Impact',
    isSortable: true,
    header: 'Impact',
    cell: (info: any) => info.getValue(),
  },
];
