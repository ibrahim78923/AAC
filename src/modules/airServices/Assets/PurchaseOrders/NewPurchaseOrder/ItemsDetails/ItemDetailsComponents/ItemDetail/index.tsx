import React, { useEffect } from 'react';
import { useLazyGetVendorProductsDropdownQuery } from '@/services/airServices/assets/purchase-orders';
import { useFormContext } from 'react-hook-form';
import { newPurchaseProductsFunction } from '../../ItemsDetails.data';

export const ItemDetail = ({ index, vendorId, watch }: any) => {
  const { setValue } = useFormContext();
  const apiQueryVendorProducts: any = useLazyGetVendorProductsDropdownQuery();
  const itemQuantity = watch(`purchaseDetails.${index}.quantity`);
  const taxRate = watch(`purchaseDetails.${index}.taxRate`);
  useEffect(() => {
    const price = watch(`purchaseDetails.${index}.costPerItem`);
    //calculating total after tax and multiplying by quantity
    const totalPrice = price * (1 + taxRate / 100) * itemQuantity;
    setValue(`purchaseDetails.${index}.total`, totalPrice?.toFixed(2));
  }, [itemQuantity, taxRate]);

  return (
    <>
      {newPurchaseProductsFunction(
        apiQueryVendorProducts,
        index,
        vendorId?._id,
      )?.map((form: any) => (
        <form.component
          {...form?.componentProps}
          size="small"
          key={form?._id}
        />
      ))}
    </>
  );
};
