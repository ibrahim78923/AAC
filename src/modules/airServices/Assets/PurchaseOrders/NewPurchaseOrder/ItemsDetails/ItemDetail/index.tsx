import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';

export const ItemDetail = (props: any) => {
  const { index, data, watch } = props;

  const { setValue } = useFormContext();

  const itemQuantity = watch(`purchaseDetails.${index}.quantity`);
  const taxRate = watch(`purchaseDetails.${index}.taxRate`);
  const price = watch(`purchaseDetails.${index}.costPerItem`);

  useEffect(() => {
    if (
      itemQuantity !== undefined &&
      taxRate !== undefined &&
      price !== undefined
    ) {
      const totalPrice = price * (1 + taxRate / 100) * itemQuantity;
      setValue(`purchaseDetails.${index}.total`, totalPrice?.toFixed(2));
    }
  }, [itemQuantity, taxRate, price]);

  return <Box>{data}</Box>;
};
