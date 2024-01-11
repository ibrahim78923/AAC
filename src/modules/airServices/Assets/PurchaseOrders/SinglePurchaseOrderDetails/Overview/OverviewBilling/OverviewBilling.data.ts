export const modalBillingData = ({
  purchaseOrderDetail,
  purchaseOrderData,
}: any) => [
  { label: 'subTotal ($)', value: purchaseOrderData?.subTotal },
  { label: 'discount (%)', value: purchaseOrderDetail?.discount },
  { label: 'Tax rate (%)', value: purchaseOrderDetail?.taxRate },
  { label: 'shipping ($)', value: purchaseOrderDetail?.shipping },
  { label: 'total ($)', value: purchaseOrderData?.subTotal },
];
