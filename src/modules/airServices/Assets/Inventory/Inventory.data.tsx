import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { ASSET_IMPACT, ASSET_TYPE, TIME_PERIODS } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';
import { Checkbox, Typography } from '@mui/material';
import dayjs from 'dayjs';

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
  {
    _id: TIME_PERIODS?.NONE,
    label: TIME_PERIODS?.NONE,
  },
  {
    _id: TIME_PERIODS?.ALL_TIME,
    label: TIME_PERIODS?.ALL_TIME,
  },
  {
    _id: TIME_PERIODS?.TODAY,
    label: TIME_PERIODS?.TODAY,
  },
  {
    _id: TIME_PERIODS?.YESTERDAY,
    label: TIME_PERIODS?.YESTERDAY,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_WEEK,
    label: TIME_PERIODS?.PREVIOUS_WEEK,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_MONTH,
    label: TIME_PERIODS?.PREVIOUS_MONTH,
  },
];
export const assetLifeExpiryOptions = [
  {
    _id: TIME_PERIODS?.NONE,
    label: TIME_PERIODS?.NONE,
  },
  {
    _id: TIME_PERIODS?.ALL_TIME,
    label: TIME_PERIODS?.ALL_TIME,
  },
  {
    _id: TIME_PERIODS?.TODAY,
    label: TIME_PERIODS?.TODAY,
  },
  {
    _id: TIME_PERIODS?.YESTERDAY,
    label: TIME_PERIODS?.YESTERDAY,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_WEEK,
    label: TIME_PERIODS?.PREVIOUS_WEEK,
  },
  {
    _id: TIME_PERIODS?.PREVIOUS_MONTH,
    label: TIME_PERIODS?.PREVIOUS_MONTH,
  },
  {
    _id: TIME_PERIODS?.NEXT_WEEK,
    label: TIME_PERIODS?.NEXT_WEEK,
  },
  {
    _id: TIME_PERIODS?.NEXT_MONTH,
    label: TIME_PERIODS?.NEXT_MONTH,
  },
];
export const assetsImpactOptions = [
  {
    _id: ASSET_IMPACT?.LOW,
    label: ASSET_IMPACT?.LOW,
  },
  {
    _id: ASSET_IMPACT?.MEDIUM,
    label: ASSET_IMPACT?.MEDIUM,
  },
  {
    _id: ASSET_IMPACT?.HIGH,
    label: ASSET_IMPACT?.HIGH,
  },
];

export const inventoryListsInitialColumns = [
  '_id',
  'displayName',
  'assetType',
  'locationId',
  'UsedBy',
  'departmentId',
  'impact',
  'assetLifeExpireOn',
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
  inventoryLists: any,
  router: any,
): any => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
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
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          inventoryLists?.length
            ? selectedInventoryLists?.length === inventoryLists?.length
            : false
        }
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
    accessorFn: (row: any) => row?.assetTypeDetails,
    id: 'assetType',
    header: 'Asset Type',
    isSortable: true,
    cell: (info: any) => info?.getValue()?.name ?? '--',
  },
  {
    accessorFn: (row: any) => row?.locationDetails,
    id: 'locationId',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => info?.getValue()?.locationName ?? '--',
  },
  {
    accessorFn: (row: any) => row?.userDetails,
    id: 'UsedBy',
    isSortable: true,
    header: 'Used By',
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: any) => row?.departmentDetails,
    id: 'departmentId',
    isSortable: true,
    header: 'Department',
    cell: (info: any) => info?.getValue()?.name ?? '--',
  },
  {
    accessorFn: (row: any) => row?.impact,
    id: 'impact',
    isSortable: true,
    header: 'Impact',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpireOn',
    isSortable: true,
    header: 'Asset life expire on',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
];
