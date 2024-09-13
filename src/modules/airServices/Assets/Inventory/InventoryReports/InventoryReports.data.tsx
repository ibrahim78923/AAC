import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { INVENTORY_REPORT_STATUS } from '@/constants/strings';
import { fullName, truncateText } from '@/utils/avatarUtils';

export const INVENTORY_REPORT_STATUS_COUNT = {
  [INVENTORY_REPORT_STATUS?.ALL]: 'allAssest',
  [INVENTORY_REPORT_STATUS?.HARDWARE]: 'inventoryHardware',
  [INVENTORY_REPORT_STATUS?.SOFTWARE]: 'backUpSoftware',
  [INVENTORY_REPORT_STATUS?.CONTRACTS]: 'inventoryContracts',
  [INVENTORY_REPORT_STATUS?.PURCHASE_ORDER]: 'inventoryPurchaseOrder',
};

export const inventoryReportsCardsDataDynamic = (data: any) => {
  return {
    [INVENTORY_REPORT_STATUS?.ALL]:
      data?.[INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.ALL]],
    [INVENTORY_REPORT_STATUS?.HARDWARE]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.HARDWARE]
      ],
    [INVENTORY_REPORT_STATUS?.SOFTWARE]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.SOFTWARE]
      ],
    [INVENTORY_REPORT_STATUS?.CONTRACTS]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.CONTRACTS]
      ],
    [INVENTORY_REPORT_STATUS?.PURCHASE_ORDER]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.PURCHASE_ORDER]
      ],
  };
};

export const inventoryReportsChartDataDynamic = (data: any) => {
  return {
    [INVENTORY_REPORT_STATUS?.HARDWARE]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.HARDWARE]
      ],
    [INVENTORY_REPORT_STATUS?.SOFTWARE]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.SOFTWARE]
      ],
    [INVENTORY_REPORT_STATUS?.CONTRACTS]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.CONTRACTS]
      ],
    [INVENTORY_REPORT_STATUS?.PURCHASE_ORDER]:
      data?.[
        INVENTORY_REPORT_STATUS_COUNT?.[INVENTORY_REPORT_STATUS?.PURCHASE_ORDER]
      ],
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
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.locationDetails,
    id: 'locationId',
    isSortable: true,
    header: 'Location',
    cell: (info: any) => truncateText(info?.getValue()?.locationName),
  },
  {
    accessorFn: (row: any) => row?.userDetails,
    id: 'usedBy',
    header: 'Used By',
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: any) => row?.assetLifeExpiry,
    id: 'assetLifeExpiry',
    header: 'Asset Like Expire On',
    cell: (info: any) =>
      dayjs(info?.getValue())?.format(DATE_FORMAT?.UI) ?? '---',
  },
];
