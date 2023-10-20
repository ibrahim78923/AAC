import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './components/PurchaseOrderFilter/PurchaseOrderFilter.data';
import { useRouter } from 'next/router';
const usePurchaseOrders = () => {
  const router = useRouter();
  const { push } = router;
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

  const handlePurchaseOrderDetail = (orderNumber: string) => {
    push(
      `/air-services/assets/purchase-orders/detail?orderNumber=${orderNumber}`,
    );
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handleNewPurchaseOrder,
    methodsPurchaseOrderFilterForm,
    submitPurchaseOrderFilterForm,
    resetPurchaseOrderFilterForm,
    handlePurchaseOrderDetail,
    // new purchase order
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
    router,
  };
};
export default usePurchaseOrders;
