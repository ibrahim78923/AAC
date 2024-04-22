import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addDigitalGiftCardDefaultValues,
  addDigitalGiftCardFormFieldsDynamic,
  addDigitalGiftCardValidationSchema,
} from './AddDigitalGiftCard.data';
import {
  useAddDigitalGiftCardMutation,
  useLazyGetContactsDropdownForDigitalGiftCardQuery,
  useLazyGetShopDropdownForDigitalGiftCardQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/digital-gift-card';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddDigitalGiftCard = (props: any) => {
  const { setIsPortalOpen } = props;
  const [addDigitalGiftCardTrigger, addDigitalGiftCardStatus] =
    useAddDigitalGiftCardMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(addDigitalGiftCardValidationSchema),
    defaultValues: addDigitalGiftCardDefaultValues,
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
      await addDigitalGiftCardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Card Added Successfullt');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    closeAddDigitalGiftCardForm?.();
    reset();
  };

  const closeAddDigitalGiftCardForm = () => {
    reset();
    setIsPortalOpen({});
  };
  const shopApiQuery = useLazyGetShopDropdownForDigitalGiftCardQuery?.();
  const contactsApiQuery =
    useLazyGetContactsDropdownForDigitalGiftCardQuery?.();

  const addDigitalGiftCardFormFields = addDigitalGiftCardFormFieldsDynamic?.(
    shopApiQuery,
    contactsApiQuery,
  );
  return {
    handleSubmit,
    onSubmit,
    methods,
    closeAddDigitalGiftCardForm,
    addDigitalGiftCardFormFields,
    addDigitalGiftCardStatus,
  };
};
