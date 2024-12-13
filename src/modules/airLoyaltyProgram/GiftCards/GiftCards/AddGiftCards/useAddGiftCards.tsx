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
  const { setIsPortalOpen, handleRefetchList } = props;
  const [addGiftCardTrigger, addGiftCardStatus] = useAddGiftCardMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardValidationSchema),
    defaultValues: addGiftCardDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const apiQueryRecipient = useLazyGetRecipientDropdownListQuery();
  const onSubmit = async (formData: any) => {
    const recipientIds = formData?.recipient?.map((item: any) => item?._id);
    const body = {
      amount: formData?.amount,
      recipient: recipientIds,
      activeFrom: isoDateString(formData?.activeFrom),
      activeTo: isoDateString(formData?.activeTo),
    };
    try {
      const res: any = await addGiftCardTrigger(body)?.unwrap();
      successSnackbar(res?.message ?? 'Card added successfully');
      handleRefetchList();
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
