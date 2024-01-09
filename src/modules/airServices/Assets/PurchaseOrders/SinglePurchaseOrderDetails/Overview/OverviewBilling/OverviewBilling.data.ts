export const modalBillingData = ({
  purchaseOrderDetailData,
  purchaseOrderData,
}: any) => [
  { label: 'subTotal ($)', value: purchaseOrderData?.subTotal },
  { label: 'discount (%)', value: purchaseOrderDetailData?.discount },
  { label: 'Tax rate (%)', value: purchaseOrderDetailData?.taxRate },
  { label: 'shipping ($)', value: purchaseOrderDetailData?.shipping },
  { label: 'total ($)', value: purchaseOrderData?.subTotal },
];
