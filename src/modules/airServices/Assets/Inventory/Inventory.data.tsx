import { AIR_SERVICES } from '@/constants';
import { ASSET_IMPACT, ASSET_TYPE, TIME_PERIODS } from '@/constants/strings';
import { Checkbox, Typography } from '@mui/material';

export const inventoryListsData: any = [
  {
    _id: 1,
    displayName: 'Logitech Mouse',
    assetType: 'Hardware',
    locationId: 'UK',
    UsedBy: 'john Doe',
    departmentId: 'IT',
    impact: 'Low',
  },
];

export const assetTypeOptions = [
  ASSET_TYPE?.SERVICES,
  ASSET_TYPE?.HARDWARE,
  ASSET_TYPE?.SOFTWARE,
];

export const dateOptions = [
  TIME_PERIODS?.NONE,
  TIME_PERIODS?.ALL_TIME,
  TIME_PERIODS?.TODAY,
  TIME_PERIODS?.YESTERDAY,
  TIME_PERIODS?.PREVIOUS_WEEK,
  TIME_PERIODS?.PREVIOUS_MONTH,
];
export const assetLifeExpiryOptions = [
  TIME_PERIODS?.NONE,
  TIME_PERIODS?.ALL_TIME,
  TIME_PERIODS?.TODAY,
  TIME_PERIODS?.YESTERDAY,
  TIME_PERIODS?.PREVIOUS_WEEK,
  TIME_PERIODS?.PREVIOUS_MONTH,
  TIME_PERIODS?.NEXT_WEEK,
  TIME_PERIODS?.NEXT_MONTH,
];
export const assetsImpactOptions = [
  ASSET_IMPACT?.LOW,
  ASSET_IMPACT?.MEDIUM,
  ASSET_IMPACT?.HIGH,
];

export const inventoryListsInitialColumns = [
  '_id',
  'displayName',
  'assetType',
  'locationId',
  'UsedBy',
  'departmentId',
  'impact',
];

export const INVENTORY_LIST_ACTIONS = {
  FILTER: 'filter',
  CUSTOMIZE_COLUMN: 'customize-column',
  DELETE: 'delete',
  IMPORT: 'import',
};

export const inventoryListsColumnsFunction: any = (
  selectedInventoryLists: any,
  setSelectedInventoryLists: any,
  inventoryLists: any = inventoryListsData,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!selectedInventoryLists?.find(
            (item: any) => item === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedInventoryLists([
                ...selectedInventoryLists,
                info?.getValue(),
              ])
            : setSelectedInventoryLists(
                selectedInventoryLists?.filter(
                  (item: any) => item !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={selectedInventoryLists?.length === inventoryLists?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedInventoryLists(
                inventoryLists?.map((list: any) => list?._id),
              )
            : setSelectedInventoryLists([]);
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
              inventoryId: info?.row?.original._id,
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
    accessorFn: (row: any) => row?.UsedBy,
    id: 'UsedBy',
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
