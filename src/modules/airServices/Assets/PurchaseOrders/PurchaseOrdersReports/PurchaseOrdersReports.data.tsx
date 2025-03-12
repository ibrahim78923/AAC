import { TruncateText } from '@/components/TruncateText';
import { PURCHASE_ORDER_REPORT_STATUS } from '@/constants/services';

export const PurchaseOrderReportsCountData = (data: any) => {
  return {
    [PURCHASE_ORDER_REPORT_STATUS?.ALL]: data?.allPurchaseOrder,
    [PURCHASE_ORDER_REPORT_STATUS?.APPROVED]: data?.purchaseApproved,
    [PURCHASE_ORDER_REPORT_STATUS?.REJECTED]: data?.purchaseRejected,
    [PURCHASE_ORDER_REPORT_STATUS?.PENDING]: data?.purchasePending,
    [PURCHASE_ORDER_REPORT_STATUS?.RECEIVED]: data?.purchaseReceived,
  };
};

export const PurchaseOrderReportsChartData = (data: any) => {
  return {
    [PURCHASE_ORDER_REPORT_STATUS?.APPROVED]: data?.purchaseApproved,
    [PURCHASE_ORDER_REPORT_STATUS?.REJECTED]: data?.purchaseRejected,
    [PURCHASE_ORDER_REPORT_STATUS?.PENDING]: data?.purchasePending,
    [PURCHASE_ORDER_REPORT_STATUS?.RECEIVED]: data?.purchaseReceived,
  };
};

export const purchaseOrderTableFilterOptions = [
  {
    _id: 6756,
    label: PURCHASE_ORDER_REPORT_STATUS?.ALL,
    value: 'allPurchaseOrder',
  },
  {
    _id: 5465,
    label: PURCHASE_ORDER_REPORT_STATUS?.APPROVED,
    value: 'purchaseApproved',
  },
  {
    _id: 5367,
    label: PURCHASE_ORDER_REPORT_STATUS?.REJECTED,
    value: 'purchaseRejected',
  },
  {
    _id: 3536,
    label: PURCHASE_ORDER_REPORT_STATUS?.PENDING,
    value: 'purchasePending',
  },
  {
    _id: 3563,
    label: PURCHASE_ORDER_REPORT_STATUS?.RECEIVED,
    value: 'purchaseReceived',
  },
];

export const purchaseOrderReportsTableColumns = [
  {
    accessorFn: (row: any) => row?.orderName,
    id: 'orderName',
    header: 'Order Name',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.vendorDetails?.name,
    id: 'vendor',
    header: 'Vendor',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.subTotal,
    id: 'totalCost',
    header: 'Total Cost (£)',
    cell: (info: any) => <TruncateText text={info?.getValue()} />,
  },
];
