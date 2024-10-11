import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addGiftCardDefaultValues,
  addGiftCardFormFieldsDynamic,
  addGiftCardValidationSchema,
} from './AddGiftCards.data';
import { useAddDigitalGiftCardMutation } from '@/services/airLoyaltyProgram/giftCards/giftCards/digital-gift-card';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddGiftCards = (props: any) => {
  const { setIsPortalOpen } = props;
  const [addGiftCardTrigger, addGiftCardStatus] =
    useAddDigitalGiftCardMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardValidationSchema),
    defaultValues: addGiftCardDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const body = {
      shop: formData?._id,
      contact: formData?.contact,
      amount: formData?.amount,
    };
    const apiDataParameter = {
      body,
    };
    try {
      await addGiftCardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Card Added Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    closeAddGiftCardForm?.();
    reset();
  };

  const closeAddGiftCardForm = () => {
    reset();
    setIsPortalOpen({});
  };

  const addGiftCardFormFields = addGiftCardFormFieldsDynamic?.();

  return {
    handleSubmit,
    onSubmit,
    methods,
    closeAddGiftCardForm,
    addGiftCardFormFields,
    addGiftCardStatus,
  };
};
