import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './components/PurchaseOrderFilter/PurchaseOrderFilter.data';
const usePurchaseOrders = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methodsPurchaseOrderFilterForm = useForm({
    defaultValues,
  });

  const submitPurchaseOrderFilterForm = async () => {};

  const resetPurchaseOrderFilterForm = async () => {
    methodsPurchaseOrderFilterForm?.reset();
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    // new purchase order
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
  };
};
export default usePurchaseOrders;
