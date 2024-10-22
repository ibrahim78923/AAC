import { RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import { Button } from '@mui/material';
import GetPurchaseOrderVendorProductDropdown from '../../PurchaseOrderFormFieldsDropdowns/GetDynamicPurchaseOrderVendorProductDropdown';

export const upsertPurchaseOrderItemDetailsDynamic = (
  index: number,
  vendorId: any,
  remove: any,
) => {
  return [
    {
      id: 1,
      data: (
        <GetPurchaseOrderVendorProductDropdown
          index={index}
          vendorId={vendorId}
        />
      ),
    },
    {
      id: 2,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.description`}
          size="small"
          placeholder="Enter Description"
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
          sx={{ minWidth: '12rem' }}
        />
      ),
    },
    {
      id: 50,
      data: (
        <RHFTextField
          name={`purchaseDetails.${index}.total`}
          size="small"
          sx={{ minWidth: '12rem' }}
          disabled
        />
      ),
    },
    {
      id: 6,
      data:
        index !== ARRAY_INDEX?.ZERO ? (
          <Button type={'button'} onClick={() => remove(index)}>
            Delete
          </Button>
        ) : (
          <Button type={'button'} disabled>
            Delete
          </Button>
        ),
    },
  ];
};

export const billingData = [
  { label: 'Sub Total (£)', name: 'subTotal' },
  { label: 'Discount (%)', name: 'discount' },
  { label: 'Tax rate (%)', name: 'taxRatio' },
  { label: 'Shipping (£)', name: 'shipping' },
  { label: 'Total (£)', name: 'total' },
];

export const itemsDetailsColumnsList = [
  { label: 'Item Name *', value: 'itemName' },
  { label: 'Description *', value: 'description' },
  { label: 'Cost Per Item *', value: 'costPerItem' },
  { label: 'Quantity *', value: 'quantity' },
  { label: 'Tax Rate(%) *', value: 'taxRate' },
  { label: 'Total(£) *', value: 'total' },
  { label: 'Action', value: 'action' },
];
