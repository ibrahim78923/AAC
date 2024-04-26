import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  upsertShopFieldsValues,
  upsertShopValidationScheme,
} from './UpsertShop.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAddShopMutation } from '@/services/airLoyaltyProgram/settings/shops';

export const useUpsertShopModal = (setAddShopModalOpen: any) => {
  const [isNewUpsertShop, setIsNewUpsertShop] = useState(true);

  const methodsUpsertShopModalForm = useForm({
    resolver: yupResolver(upsertShopValidationScheme),
    defaultValues: upsertShopFieldsValues,
  });

  const { handleSubmit, reset } = methodsUpsertShopModalForm;

  const [postShopTrigger, shopStatus] = useAddShopMutation();

  const submitUpsertShopModalForm = async (data: any) => {
    try {
      await postShopTrigger(data)?.unwrap();
      successSnackbar('Shop added successfully!');
      handleClose();
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
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
    handleSubmit,
    shopStatus,
  };
};
