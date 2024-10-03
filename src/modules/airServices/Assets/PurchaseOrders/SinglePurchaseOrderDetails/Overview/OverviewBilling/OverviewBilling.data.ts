export const modalBillingData = ({ purchaseOrderData, total }: any) => [
  {
    label: 'Sub Total ($)',
    value: purchaseOrderData?.subTotal,
  },
  { label: 'Discount (%)', value: purchaseOrderData?.discount },
  { label: 'Tax Rate (%)', value: purchaseOrderData?.taxRate },
  { label: 'Shipping ($)', value: purchaseOrderData?.shipping },
  { label: 'Total ($)', value: total },
];
