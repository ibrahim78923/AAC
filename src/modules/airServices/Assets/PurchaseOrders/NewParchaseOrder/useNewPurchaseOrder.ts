import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
const useNewPurchaseOrders = () => {
  const { push } = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methods = useForm({
    defaultValues,
  });
  const submit = async () => {};

  const handlePageBack = () => {
    push('/air-services/assets/purchase-orders');
  };

  const resetPurchaseOrderFilterForm = async () => {
    methods?.reset();
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handlePageBack,
    methods,
    submit,
    resetPurchaseOrderFilterForm,
    // new purchase order
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
  };
};
export default useNewPurchaseOrders;
