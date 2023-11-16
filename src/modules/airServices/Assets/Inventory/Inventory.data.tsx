import { AIR_SERVICES } from '@/constants';
import { Checkbox, Typography } from '@mui/material';

// export const data: any = [
//   {
//     id: 1,
//     displayName: 'Logitech Mouse',
//     assetType: 'Hardware',
//     locationId: '---',
//     usedBy: '---',
//     departmentId: '---',
//     impact: 'Low',
//   },
//   {
//     id: 2,
//     displayName: 'Dell Monitor',
//     assetType: 'Hardware',
//     locationId: '---',
//     usedBy: '---',
//     departmentId: '---',
//     impact: 'Low',
//   },
//   {
//     id: 3,
//     displayName: 'Andrea’s Laptop',
//     assetType: `Hardware`,
//     locationId: '---',
//     usedBy: 'Andrea',
//     departmentId: '---',
//     impact: 'Medium',
//   },
// ];

export const INVENTORY_LIST_ACTIONS = {
  FILTER: 'filter',
  CUSTOMIZE_COLUMN: 'customize-column',
};

export const inventoryListsColumnsFunction = (
  inventoryData: any,
  setInventoryData: any,
  data: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!inventoryData?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setInventoryData([
                ...inventoryData,
                data?.find((item: any) => item?.id === info?.getValue()),
              ])
            : setInventoryData(
                inventoryData?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={inventoryData?.length === data?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setInventoryData([...data])
            : setInventoryData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Typography
        component={'span'}
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_INVENTORY_DETAIL,
            query: {
              inventoryId: data?._id,
            },
          })
        }
        color="custom.bright"
        sx={{ cursor: 'pointer' }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.assetType,
    id: 'assetType',
    header: 'Asset Type',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.locationId,
    id: 'locationId',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.usedBy,
    id: 'usedBy',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.departmentId,
    id: 'departmentId',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    isSortable: true,
    header: 'Impact',
    cell: (info: any) => info?.getValue(),
  },
];
