import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addGiftCardDefaultValues,
  addGiftCardFormFieldsDynamic,
  addGiftCardValidationSchema,
} from './AddGiftCards.data';
import {
  useAddGiftCardMutation,
  useLazyGetRecipientDropdownListQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';

export const useAddGiftCards = (props: any) => {
  const { setIsPortalOpen } = props;
  const [addGiftCardTrigger, addGiftCardStatus] = useAddGiftCardMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardValidationSchema),
    defaultValues: addGiftCardDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const apiQueryRecipient = useLazyGetRecipientDropdownListQuery();
  const onSubmit = async (formData: any) => {
    const body = {
      amount: formData?.amount,
      recipient: ['6736eb0da7c5474399c53584'],
      activeFrom: isoDateString(formData?.activeFrom),
      activeTo: isoDateString(formData?.activeTo),
    };
    // const apiDataParameter = {
    //   body,
    // };
    try {
      await addGiftCardTrigger(body)?.unwrap();
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

  const addGiftCardFormFields =
    addGiftCardFormFieldsDynamic?.(apiQueryRecipient);

  return {
    handleSubmit,
    onSubmit,
    methods,
    closeAddGiftCardForm,
    addGiftCardFormFields,
    addGiftCardStatus,
  };
};
