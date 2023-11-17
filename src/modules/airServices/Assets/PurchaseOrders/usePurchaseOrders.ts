import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './PurchaseOrderFilter/PurchaseOrderFilter.data';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

const { NEW_PURCHASE_ORDER } = AIR_SERVICES;

const usePurchaseOrders = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methodsPurchaseOrderFilterForm = useForm({
    defaultValues,
  });

  const handleNewPurchaseOrder = () => {
    router?.push(NEW_PURCHASE_ORDER);
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
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
    router,
  };
};
export default usePurchaseOrders;
