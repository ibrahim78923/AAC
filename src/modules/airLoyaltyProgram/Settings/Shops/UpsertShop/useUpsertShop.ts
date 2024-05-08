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

  const method: any = useForm<any>({
    resolver: yupResolver(upsertShopValidationScheme),
    defaultValues: upsertShopFieldsValues?.(),
  });

  const { handleSubmit, reset } = method;

  const [addShopTrigger, addShopStatus] = useAddShopMutation();
  const [editSingleShopTrigger, editSingleShopStatus] =
    useEditSingleShopMutation();

  const submitUpsertShopForm = async (formData: any) => {
    const shopFormData = new FormData();
    shopFormData?.append('name', formData?.name);
    shopFormData?.append('shopType', formData?.shopType?._id);
    shopFormData?.append('email', formData?.email);
    shopFormData?.append('city', formData?.city);
    shopFormData?.append('country', formData?.country?._id);
    shopFormData?.append('postCode', formData?.postCode);
    shopFormData?.append('address', formData?.address);
    formData?.fileUrl !== null &&
      shopFormData?.append('fileUrl', formData?.fileUrl);

    if (isPortalOpen?.data?._id) {
      submitUpdateShop?.(shopFormData);
      return;
    }

    const apiDataParameter = {
      body: shopFormData,
    };

    try {
      await addShopTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Shop added successfully!');
      await getShopLists?.();
      handleClose();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateShop = async (formData: any) => {
    formData?.append('name', formData?.name);
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
