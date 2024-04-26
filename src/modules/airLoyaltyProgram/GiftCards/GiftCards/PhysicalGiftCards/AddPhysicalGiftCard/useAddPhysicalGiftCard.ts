import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addPhysicalGiftCardDefaultValues,
  addPhysicalGiftCardFormFieldsDynamic,
  addPhysicalGiftCardValidationSchema,
} from './AddPhysicalGiftCard.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAddPhysicalGiftCardMutation,
  useLazyGetShopDropdownForPhysicalGiftCardQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/physical-gift-card/unassigned';

export const useAddPhysicalGiftCard = (props: any) => {
  const { setIsPortalOpen } = props;
  const [addPhysicalGiftCardTrigger, addPhysicalGiftCardStatus] =
    useAddPhysicalGiftCardMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(addPhysicalGiftCardValidationSchema),
    defaultValues: addPhysicalGiftCardDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const submitAddPhysicalGiftCard = async (formData: any) => {
    const body = {
      shop: formData?._id,
      amount: formData?.noOfGiftCards,
    };
    const apiDataParameter = {
      body,
    };
    try {
      await addPhysicalGiftCardTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Card Added Successfullt');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    closeAddPhysicalGiftCardForm?.();
    reset();
  };

  const closeAddPhysicalGiftCardForm = () => {
    reset();
    setIsPortalOpen({});
  };

  const shopApiQuery = useLazyGetShopDropdownForPhysicalGiftCardQuery?.();

  const addPhysicalGiftCardFormFields =
    addPhysicalGiftCardFormFieldsDynamic?.(shopApiQuery);
  return {
    handleSubmit,
    submitAddPhysicalGiftCard,
    methods,
    closeAddPhysicalGiftCardForm,
    addPhysicalGiftCardFormFields,
    addPhysicalGiftCardStatus,
  };
};
