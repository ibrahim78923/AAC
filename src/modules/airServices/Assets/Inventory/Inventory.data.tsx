import { AIR_SERVICES } from '@/constants';
import { Checkbox, Typography } from '@mui/material';

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
    accessorFn: (row: any) => row?.original?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!inventoryData?.find(
            (item: any) => item?._id === info?.row?.original?._id,
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setInventoryData([
                ...inventoryData,
                data?.find(
                  (item: any) => item?._id === info?.row?.original?._id,
                ),
              ])
            : setInventoryData(
                inventoryData?.filter((item: any) => {
                  return item?._id !== info?.row?.original?._id;
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
    id: 'Display Name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => (
      <Typography
        component={'span'}
        onClick={() =>
          router?.push({
            pathname: AIR_SERVICES?.ASSETS_INVENTORY_DETAIL,
            query: {
              inventoryId: info?.row?.original?._id,
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
    id: 'Asset Type',
    header: 'Asset Type',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.location,
    id: 'Location',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.used,
    id: 'Used By',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.department,
    id: 'Department',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'Impact',
    isSortable: true,
    header: 'Impact',
    cell: (info: any) => info?.getValue(),
  },
];
