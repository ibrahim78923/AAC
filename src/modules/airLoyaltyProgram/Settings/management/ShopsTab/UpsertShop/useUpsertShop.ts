import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useUpsertShopModal = (setAddShopModalOpen: any) => {
  const [isNewUpsertShop, setIsNewUpsertShop] = useState(true);

  const methodsUpsertShopModalForm = useForm({
    // defaultValues,
  });

  const submitUpsertShopModalForm = async () => {
    enqueueSnackbar('Shop added successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    handleClose();
  };
  const handleClose = () => {
    setAddShopModalOpen(false);
    methodsUpsertShopModalForm?.reset();
  };

  return {
    methodsUpsertShopModalForm,
    submitUpsertShopModalForm,
    isNewUpsertShop,
    setIsNewUpsertShop,
    handleClose,
  };
};
