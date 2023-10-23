import { Checkbox } from '@mui/material';

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
export const columns = (
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
    header: <span>Name</span>,
    cell: (info: any) => (
      <span
        onClick={() =>
          router.push({
            pathname: '/air-services/assets/inventory/detail',
            query: {
              inventoryId: info?.row?.id,
            },
          })
        }
        style={{ color: '#0AADC7', cursor: 'pointer' }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.AssetType,
    id: 'AssetType',
    header: <span>Asset Type</span>,
    isSortable: true,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Location,
    id: 'Location',
    isSortable: true,
    header: <span>Location</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.UsedBy,
    id: 'UsedBy',
    isSortable: true,
    header: <span>Used By</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Department,
    id: 'Department',
    isSortable: true,
    header: <span>Department</span>,
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.Impact,
    id: 'Impact',
    isSortable: true,
    header: <span>Impact</span>,
    cell: (info: any) => info.getValue(),
  },
];
