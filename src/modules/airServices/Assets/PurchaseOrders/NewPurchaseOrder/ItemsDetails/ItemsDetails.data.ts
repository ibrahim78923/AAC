import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
export const newPurchaseProductsFunction = (
  vendorProductsApiQuery: any,
  index: number,
) => [
  {
    id: 3,
    component: RHFAutocompleteAsync,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.itemName`,
      apiQuery: vendorProductsApiQuery,
      externalParams: { meta: false, limit: 50 },
      sx: { flex: 3 },
    },
  },
  {
    id: 8,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.description`,
      sx: { flex: 3 },
    },
    gridLength: 12,
    component: RHFTextField,
  },
  {
    id: 1,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.quantity`,
      type: 'number',
      sx: { flex: 1 },
    },
  },
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.costPerItem`,
      type: 'number',
      sx: { flex: 1 },
    },
  },
  {
    id: 12,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.taxRate`,
      type: 'number',
      sx: { flex: 1 },
    },
  },
  {
    id: 21,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.total`,
      type: 'number',
      sx: { flex: 3 },
    },
  },
];

export const itemsDetailsData = [
  {
    itemName: 'Dell ',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 2',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 3',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 4',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
  {
    itemName: 'Dell 5',
    description: ' dell product',
    costPerItem: 200,
    quantity: 12,
    taxRate: 17,
    total: 2400,
  },
];

export const billingData = [
  { label: 'subTotal ($)', value: 144.0 },
  { label: 'discount (%)', value: 0 },
  { label: 'Tax rate (%)', value: 0 },
  { label: 'shipping ($)', value: 0 },
  { label: 'total ($)', value: 0 },
];
