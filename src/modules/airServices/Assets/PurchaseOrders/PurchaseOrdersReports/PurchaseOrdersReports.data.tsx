import { ARRAY_INDEX, PURCHASE_ORDER_REPORT_STATUS } from '@/constants/strings';
import { truncateText } from '@/utils/avatarUtils';

export const PURCHASE_ORDER_REPORT_STATUS_COUNT = {
  [PURCHASE_ORDER_REPORT_STATUS?.ALL]: 'allPurchaseOrder',
  [PURCHASE_ORDER_REPORT_STATUS?.APPROVED]: 'purchaseApproved',
  [PURCHASE_ORDER_REPORT_STATUS?.REJECTED]: 'purchaseRejected',
  [PURCHASE_ORDER_REPORT_STATUS?.PENDING]: 'purchasePending',
  [PURCHASE_ORDER_REPORT_STATUS?.RECEIVED]: 'purchaseReceived',
};

export const purchaseOrderReportsCardsDataDynamic = (data: any) => {
  return {
    [PURCHASE_ORDER_REPORT_STATUS?.ALL]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[PURCHASE_ORDER_REPORT_STATUS?.ALL]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.APPROVED]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.APPROVED
        ]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.REJECTED]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.REJECTED
        ]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.PENDING]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.PENDING
        ]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.RECEIVED]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.RECEIVED
        ]
      ],
  };
};

export const purchaseOrderReportsChartDataDynamic = (data: any) => {
  return {
    [PURCHASE_ORDER_REPORT_STATUS?.APPROVED]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.APPROVED
        ]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.REJECTED]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.REJECTED
        ]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.PENDING]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.PENDING
        ]
      ],
    [PURCHASE_ORDER_REPORT_STATUS?.RECEIVED]:
      data?.[
        PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
          PURCHASE_ORDER_REPORT_STATUS?.RECEIVED
        ]
      ],
  };
};

export const purchaseOrderTableFilterOptions = [
  {
    _id: 6756,
    label: PURCHASE_ORDER_REPORT_STATUS?.ALL,
    value:
      PURCHASE_ORDER_REPORT_STATUS_COUNT?.[PURCHASE_ORDER_REPORT_STATUS?.ALL],
  },
  {
    _id: 5465,
    label: PURCHASE_ORDER_REPORT_STATUS?.APPROVED,
    value:
      PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
        PURCHASE_ORDER_REPORT_STATUS?.APPROVED
      ],
  },
  {
    _id: 5367,
    label: PURCHASE_ORDER_REPORT_STATUS?.REJECTED,
    value:
      PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
        PURCHASE_ORDER_REPORT_STATUS?.REJECTED
      ],
  },
  {
    _id: 3536,
    label: PURCHASE_ORDER_REPORT_STATUS?.PENDING,
    value:
      PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
        PURCHASE_ORDER_REPORT_STATUS?.PENDING
      ],
  },
  {
    _id: 3563,
    label: PURCHASE_ORDER_REPORT_STATUS?.RECEIVED,
    value:
      PURCHASE_ORDER_REPORT_STATUS_COUNT?.[
        PURCHASE_ORDER_REPORT_STATUS?.RECEIVED
      ],
  },
];

export const purchaseOrderReportsTableColumns = [
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    header: 'Order Name',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.vendorDetails?.name,
    id: 'vendor',
    header: 'Vendor',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.purchaseDetails[ARRAY_INDEX?.ZERO]?.total,
    id: 'totalCost',
    header: 'Total Cost (£)',
    cell: (info: any) =>
      info?.getValue() !== undefined ? info?.getValue() : '---',
  },
];
