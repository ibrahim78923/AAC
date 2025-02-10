import { RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import GetPurchaseOrderVendorProductDropdown from '../../PurchaseOrderFormFieldsDropdowns/GetDynamicPurchaseOrderVendorProductDropdown';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { ItemDetail } from './ItemDetail';

export const upsertPurchaseOrderItemDetailsDynamic = (
  index: number,
  vendorId: any,
  remove: any,
  watch?: any,
) => {
  return [
    {
      id: 1,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <GetPurchaseOrderVendorProductDropdown
              index={index}
              vendorId={vendorId}
            />
          }
        />
      ),
    },
    {
      id: 2,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <RHFTextField
              name={`purchaseDetails.${index}.description`}
              size="small"
              placeholder="Enter Description"
              sx={{ minWidth: '12rem' }}
            />
          }
        />
      ),
    },
    {
      id: 3,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <RHFTextField
              name={`purchaseDetails.${index}.costPerItem`}
              size="small"
              sx={{ minWidth: '5rem' }}
            />
          }
        />
      ),
    },
    {
      id: 4,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <RHFTextField
              name={`purchaseDetails.${index}.quantity`}
              size="small"
              sx={{ minWidth: '12rem' }}
            />
          }
        />
      ),
    },
    {
      id: 5,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <RHFTextField
              name={`purchaseDetails.${index}.taxRate`}
              size="small"
              sx={{ minWidth: '12rem' }}
            />
          }
        />
      ),
    },
    {
      id: 50,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <RHFTextField
              name={`purchaseDetails.${index}.total`}
              size="small"
              sx={{ minWidth: '12rem' }}
              disabled
            />
          }
        />
      ),
    },
    {
      id: 6,
      data: (
        <ItemDetail
          index={index}
          watch={watch}
          data={
            <CustomButton
              variant="text"
              hasIcon={false}
              type="button"
              disabled={index === ARRAY_INDEX?.ZERO}
              onClick={() => remove(index)}
            >
              Delete
            </CustomButton>
          }
        />
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
  { label: 'Item Name *', _id: 'itemName' },
  { label: 'Description *', _id: 'description' },
  { label: 'Cost Per Item *', _id: 'costPerItem' },
  { label: 'Quantity *', _id: 'quantity' },
  { label: 'Tax Rate(%) *', _id: 'taxRate' },
  { label: 'Total(£) *', _id: 'total' },
  { label: 'Action', _id: 'action' },
];
