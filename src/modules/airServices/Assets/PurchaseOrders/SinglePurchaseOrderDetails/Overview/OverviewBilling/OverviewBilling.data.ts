export const modalBillingData = ({
  purchaseOrderDetail,
  purchaseOrderData,
  purchaseOrderDetailData,
  rowData,
  total,
}: any) => [
  {
    label: 'subTotal ($)',
    value: rowData
      ? purchaseOrderData?.subTotal
      : purchaseOrderDetailData[0]?.subTotal,
  },
  { label: 'discount (%)', value: purchaseOrderData?.discount },
  { label: 'Tax rate (%)', value: purchaseOrderDetail?.taxRate },
  { label: 'shipping ($)', value: purchaseOrderData?.shipping },
  { label: 'total ($)', value: total },
];
