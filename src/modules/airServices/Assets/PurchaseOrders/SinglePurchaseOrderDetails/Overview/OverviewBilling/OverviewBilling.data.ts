export const modalBillingData = ({ purchaseOrderData, total }: any) => [
  {
    label: 'subTotal ($)',
    value: purchaseOrderData?.subTotal,
  },
  { label: 'discount (%)', value: purchaseOrderData?.discount },
  { label: 'Tax rate (%)', value: purchaseOrderData?.taxRate },
  { label: 'shipping ($)', value: purchaseOrderData?.shipping },
  { label: 'total ($)', value: total },
];
