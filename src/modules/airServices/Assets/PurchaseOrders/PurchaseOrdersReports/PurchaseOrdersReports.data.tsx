import { PURCHASE_ORDER_REPORT_STATUS } from '@/constants/strings';

export const PURCHASE_ORDER_REPORT_STATUS_COUNT = {
  [PURCHASE_ORDER_REPORT_STATUS?.ALL]: 'allPurchaseOrder',
  [PURCHASE_ORDER_REPORT_STATUS?.APPROVED]: 'approved',
  [PURCHASE_ORDER_REPORT_STATUS?.REJECTED]: 'rejected',
  [PURCHASE_ORDER_REPORT_STATUS?.PENDING]: 'pendings',
  [PURCHASE_ORDER_REPORT_STATUS?.RECEIVED]: 'recieved',
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
    _id: PURCHASE_ORDER_REPORT_STATUS?.ALL,
    label: PURCHASE_ORDER_REPORT_STATUS?.ALL,
    value: 'allPurchaseOrder',
  },
  {
    _id: PURCHASE_ORDER_REPORT_STATUS?.APPROVED,
    label: PURCHASE_ORDER_REPORT_STATUS?.APPROVED,
    value: 'purchaseApproved',
  },
  {
    _id: PURCHASE_ORDER_REPORT_STATUS?.REJECTED,
    label: PURCHASE_ORDER_REPORT_STATUS?.REJECTED,
    value: 'purchaseRejected',
  },
  {
    _id: PURCHASE_ORDER_REPORT_STATUS?.PENDING,
    label: PURCHASE_ORDER_REPORT_STATUS?.PENDING,
    value: 'purchasePending',
  },
  {
    _id: PURCHASE_ORDER_REPORT_STATUS?.RECEIVED,
    label: PURCHASE_ORDER_REPORT_STATUS?.RECEIVED,
    value: 'purchaseReceived',
  },
];

export const purchaseOrderReportsTableColumnsDynamic = () => [
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    header: 'Order Name',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.vendor,
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
    accessorFn: (row: any) => row?.totalCost,
    id: 'totalCost',
    header: 'Total Cost (£)',
    cell: (info: any) => {
      const totalCost = info?.row?.original?.purchaseDetails[0]?.total;
      return totalCost !== undefined ? totalCost : '---';
    },
  },
];
