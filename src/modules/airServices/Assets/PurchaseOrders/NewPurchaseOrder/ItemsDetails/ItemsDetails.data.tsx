import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants';
import Link from 'next/link';
export const newPurchaseProductsFunction = (
  vendorProductsApiQuery: any,
  index: number,
  vendorId: any,
) => [
  {
    id: 3,
    component: RHFAutocompleteAsync,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      externalParams: { limit: 50, vendorId: vendorId },
      name: `purchaseDetails.${index}.itemName`,
      getOptionLabel: (option: any) =>
        option?.vendorproductcatalogsDetails?.name,
      apiQuery: vendorProductsApiQuery,
      sx: { flex: 3 },
      noOptionsCase: (
        <>
          <Link href={AIR_SERVICES?.UPSERT_PRODUCT_CATALOG}>
            Please Add Products First
          </Link>
        </>
      ),
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
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.costPerItem`,
      type: 'number',
      InputProps: {
        inputProps: {
          min: 0,
        },
      },
      sx: { flex: 1 },
    },
  },
  {
    id: 1,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: `purchaseDetails.${index}.quantity`,
      type: 'number',
      InputProps: {
        inputProps: {
          min: 0,
        },
      },
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
      InputProps: {
        inputProps: {
          max: 100,
          min: 0,
        },
      },
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
      disabled: true,
      InputProps: {
        inputProps: {
          min: 0,
        },
      },
      type: 'number',
      sx: { flex: 3 },
    },
  },
];

export const billingData = [
  { label: 'subTotal ($)', name: 'subTotal' },
  { label: 'discount (%)', name: 'discount' },
  { label: 'Tax rate (%)', name: 'taxRatio' },
  { label: 'shipping ($)', name: 'shipping' },
  { label: 'total ($)', name: 'total' },
];
