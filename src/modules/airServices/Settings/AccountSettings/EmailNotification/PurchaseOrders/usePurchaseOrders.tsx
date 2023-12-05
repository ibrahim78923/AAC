import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { purchaseOrdersData } from './PurchaseOrders.data';

export const usePurchaseOrders = () => {
  const [showIcon, setShowIcon] = useState<any>(null);
  const [purchaseOrder, setPurchaseOrder] = useState(purchaseOrdersData);

  const onSwitchChange = (id: any) => {
    const updatedDetails = purchaseOrder?.map((item: any) => {
      if (item?.id === id) {
        const updatedValue = !item?.value;
        enqueueSnackbar(
          `${item?.name} ${
            updatedValue ? 'Activated' : 'Deactivated'
          } Successfully `,
          {
            variant: updatedValue
              ? NOTISTACK_VARIANTS?.SUCCESS
              : NOTISTACK_VARIANTS?.ERROR,
          },
        );
        return {
          ...item,
          value: updatedValue,
        };
      }
      return item;
    });

    setPurchaseOrder(updatedDetails);
  };
  return { purchaseOrder, setShowIcon, showIcon, onSwitchChange };
};
