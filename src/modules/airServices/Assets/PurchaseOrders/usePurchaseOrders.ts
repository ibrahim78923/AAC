import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './components/PurchaseOrderFilter/PurchaseOrderFilter.data';
import { useRouter } from 'next/router';
const usePurchaseOrders = () => {
  const { push } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methodsPurchaseOrderFilterForm = useForm({
    defaultValues,
  });

  const handleNewPurchaseOrder = () => {
    push('/air-services/assets/purchase-orders/new-purchase');
  };

  const submitPurchaseOrderFilterForm = async () => {};

  const resetPurchaseOrderFilterForm = async () => {
    methodsPurchaseOrderFilterForm?.reset();
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    // new purchase order
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
  };
};
export default usePurchaseOrders;
