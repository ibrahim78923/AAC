export const modalBillingData = ({
  purchaseOrderDetail,
  purchaseOrderData,
}: any) => [
  { label: 'subTotal ($)', value: purchaseOrderData?.subTotal },
  { label: 'discount (%)', value: purchaseOrderData?.discount },
  { label: 'Tax rate (%)', value: purchaseOrderDetail?.taxRate },
  { label: 'shipping ($)', value: purchaseOrderData?.shipping },
  { label: 'total ($)', value: purchaseOrderDetail?.total },
];
