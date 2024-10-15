import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { INVENTORY_REPORT_STATUS } from '@/constants/strings';
import { fullName } from '@/utils/avatarUtils';
import { TruncateText } from '@/components/TruncateText';

export const InventoryReportsCountData = (data: any) => {
  return {
    [INVENTORY_REPORT_STATUS?.ALL]: data?.allAssest,
    [INVENTORY_REPORT_STATUS?.HARDWARE]: data?.inventoryHardware,
    [INVENTORY_REPORT_STATUS?.SOFTWARE]: data?.backUpSoftware,
    [INVENTORY_REPORT_STATUS?.CONTRACTS]: data?.inventoryContracts,
    [INVENTORY_REPORT_STATUS?.PURCHASE_ORDER]: data?.inventoryPurchaseOrder,
  };
};

export const inventoryTableFilterOptions = [
  {
    _id: INVENTORY_REPORT_STATUS?.ALL,
    label: INVENTORY_REPORT_STATUS?.ALL,
    value: 'allAssest',
  },
  {
    _id: INVENTORY_REPORT_STATUS?.HARDWARE,
    label: INVENTORY_REPORT_STATUS?.HARDWARE,
    value: 'inventoryHardware',
  },
  {
    _id: INVENTORY_REPORT_STATUS?.SOFTWARE,
    label: INVENTORY_REPORT_STATUS?.SOFTWARE,
    value: 'backUpSoftware',
  },
  {
    _id: INVENTORY_REPORT_STATUS?.CONTRACTS,
    label: INVENTORY_REPORT_STATUS?.CONTRACTS,
    value: 'inventoryContracts',
  },
  {
    _id: INVENTORY_REPORT_STATUS?.PURCHASE_ORDER,
    label: INVENTORY_REPORT_STATUS?.PURCHASE_ORDER,
    value: 'inventoryPurchaseOrder',
  },
];

export const inventoryColumns = [
  {
    accessorFn: (row: any) => row?.displayName,
    id: 'displayName',
    header: 'Name',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.locationDetails,
    id: 'locationId',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => (
      <TruncateText
        text={info?.row?.original?.locationDetails?.locationName?.toLowerCase()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.userDetails,
    id: 'usedBy',
    header: 'Used By',
    cell: (info: any) => (
      <TruncateText
        text={fullName(
          info?.getValue()?.firstName?.toLowerCase(),
          info?.getValue()?.lastName?.toLowerCase(),
        )}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpiry',
    header: 'Asset Like Expire On',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? '---',
  },
];
