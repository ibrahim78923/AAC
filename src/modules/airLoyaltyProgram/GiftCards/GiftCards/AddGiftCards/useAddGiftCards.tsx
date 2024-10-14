import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addGiftCardDefaultValues,
  addGiftCardFormFieldsDynamic,
  addGiftCardValidationSchema,
} from './AddGiftCards.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAddGiftCardMutation } from '@/services/airLoyaltyProgram/giftCards/giftCards';

export const useAddGiftCards = (props: any) => {
  const { setIsPortalOpen } = props;
  const [addGiftCardTrigger, addGiftCardStatus] = useAddGiftCardMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardValidationSchema),
    defaultValues: addGiftCardDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const body = {
      amount: formData?.amount,
      recipient: formData?.recipient,
      activeFrom: formData?.activeFrom,
      activeTo: formData?.activeTo,
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
