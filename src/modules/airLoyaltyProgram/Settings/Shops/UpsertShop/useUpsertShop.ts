import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertShopFieldsValues,
  upsertShopFormFieldsDynamic,
  upsertShopValidationScheme,
} from './UpsertShop.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAddShopMutation,
  useEditSingleShopMutation,
} from '@/services/airLoyaltyProgram/settings/shops';

export const useUpsertShopModal = (props: any) => {
  const { isPortalOpen, setIsPortalOpen, getShopLists } = props;

  const method = useForm<any>({
    resolver: yupResolver(upsertShopValidationScheme),
    defaultValues: upsertShopFieldsValues?.(),
  });

  const { handleSubmit, reset } = method;

  const [addShopTrigger, addShopStatus] = useAddShopMutation();
  const [editSingleShopTrigger, editSingleShopStatus] =
    useEditSingleShopMutation();

  const submitUpsertShopForm = async (formData: any) => {
    if (isPortalOpen?.data?._id) {
      submitUpdateShop?.(formData);
      return;
    }
    try {
      await addShopTrigger(formData)?.unwrap();
      successSnackbar('Shop added successfully!');
      await getShopLists?.();
      handleClose();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateShop = async (formData: any) => {
    try {
      await editSingleShopTrigger(formData)?.unwrap();
      successSnackbar('Shop added successfully!');
      await getShopLists?.();
      handleClose();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsPortalOpen?.(false);
    reset?.();
  };

  const upsertShopFormFields = upsertShopFormFieldsDynamic?.();

  return {
    method,
    submitUpsertShopForm,
    handleClose,
    handleSubmit,
    addShopStatus,
    upsertShopFormFields,
    editSingleShopStatus,
  };
};
