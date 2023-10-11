import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './NewPurchaseOrder.data';
const useNewPurchaseOrders = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methods = useForm({
    defaultValues,
  });
  const submit = async () => {};

  const resetPurchaseOrderFilterForm = async () => {
    methods?.reset();
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methods,
    submit,
    resetPurchaseOrderFilterForm,
    // new purchase order
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
  };
};
export default useNewPurchaseOrders;
