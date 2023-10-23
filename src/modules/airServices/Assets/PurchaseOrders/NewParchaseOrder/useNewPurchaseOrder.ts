import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
const useNewPurchaseOrders = () => {
  const { push } = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [vendor, setVendor] = useState<string>('');
  const [isNewPurchaseOrder, setIsNewPurchaseOrder] = useState(true);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const submit = async (data: any) => {
    // console.log(data);
    enqueueSnackbar({
      message: 'New Purchase Order Created successfully',
      variant: 'success',
    });
  };

  const handlePageBack = () => {
    push('/air-services/assets/purchase-orders');
  };

  const handleVenderSelect = (e: any) => {
    const { name, value } = e?.target;
    methods?.setValue(name, value);
    setVendor(value || '');
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
    vendor,
    submit,
    resetPurchaseOrderFilterForm,
    // new purchase order
    isNewPurchaseOrder,
    setIsNewPurchaseOrder,
    handleVenderSelect,
  };
};
export default useNewPurchaseOrders;
