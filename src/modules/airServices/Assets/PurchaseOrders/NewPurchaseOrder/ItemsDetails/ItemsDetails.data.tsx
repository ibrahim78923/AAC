import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { PAGINATION } from '@/config';
import { AIR_SERVICES } from '@/constants';
import { ARRAY_INDEX } from '@/constants/strings';
import { Button } from '@mui/material';
import Link from 'next/link';

export const upsertPurchaseOrderItemDetailsDynamic = (
  vendorProductsApiQuery: any,
  index: number,
  vendorId: any,
  remove: any,
) => {
  return [
    {
      id: 1,
      data: (
        <RHFAutocompleteAsync
          name={`purchaseDetails.${index}.itemName`}
          size="small"
          fullWidth={true}
          sx={{ minWidth: '12rem' }}
          getOptionLabel={(option: any) =>
            option?.vendorproductcatalogsDetails?.name
          }
          apiQuery={vendorProductsApiQuery}
          externalParams={{
            limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
            vendorId: vendorId,
          }}
          noOptionsCase={
            <>
              <Link href={AIR_SERVICES?.UPSERT_PRODUCT_CATALOG}>
                Please Add Products First
              </Link>
            </>
          }
        />
      ),
    },
    {
      id: 2,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.description`}
          size="small"
          fullWidth={true}
          sx={{ minWidth: '12rem' }}
        />
      ),
    },
    {
      id: 3,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.costPerItem`}
          size="small"
          fullWidth={true}
          sx={{ minWidth: '5rem' }}
        />
      ),
    },
    {
      id: 4,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.quantity`}
          size="small"
          fullWidth={true}
          sx={{ minWidth: '12rem' }}
        />
      ),
    },
    {
      id: 5,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.taxRate`}
          size="small"
          fullWidth={true}
          sx={{ minWidth: '12rem' }}
        />
      ),
    },
    {
      id: 5,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.total`}
          size="small"
          fullWidth={true}
          sx={{ minWidth: '12rem' }}
        />
      ),
    },
    {
      id: 6,
      data: index !== ARRAY_INDEX?.ZERO && (
        <Button type="button" onClick={() => remove(index)}>
          Delete
        </Button>
      ),
    },
  ];
};

export const billingData = [
  { label: 'subTotal ($)', name: 'subTotal' },
  { label: 'discount (%)', name: 'discount' },
  { label: 'Tax rate (%)', name: 'taxRatio' },
  { label: 'shipping ($)', name: 'shipping' },
  { label: 'total ($)', name: 'total' },
];

export const itemsDetailsColumnsList = [
  { label: 'Item Name', value: 'itemName' },
  { label: 'Description', value: 'description' },
  { label: 'Cost Per Item', value: 'costPerItem' },
  { label: 'Quantity', value: 'quantity' },
  { label: 'Tax Rate(%)', value: 'taxRate' },
  { label: 'Total()', value: 'total' },
  { label: 'Action', value: 'action' },
];
