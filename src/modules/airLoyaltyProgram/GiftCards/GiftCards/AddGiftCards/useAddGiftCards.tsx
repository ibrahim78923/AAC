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
import { useEffect } from 'react';
import { useFormLib } from '@/hooks/useFormLib';

export const useAddGiftCards = (props: any) => {
  const { setIsPortalOpen, handleRefetchList } = props;
  const [addGiftCardTrigger, addGiftCardStatus] = useAddGiftCardMutation();
  const apiQueryRecipient = useLazyGetRecipientDropdownListQuery();

  const addGiftCardsMethodProps: any = {
    validationSchema: addGiftCardValidationSchema,
    defaultValues: addGiftCardDefaultValues,
  };
  const { handleSubmit, reset, watch, setValue, methods } = useFormLib(
    addGiftCardsMethodProps,
  );

  const onSubmit = async (formData: any) => {
    const recipientIds = formData?.recipient?.map((item: any) => item?._id);
    const body = {
      amount: formData?.amount,
      currentamount: formData?.amount,
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

  const [activeToValue, activeFromValue] = watch(['activeTo', 'activeFrom']);

  useEffect(() => {
    if (new Date(activeToValue) < new Date(activeFromValue)) {
      setValue('activeTo', null);
    }
  }, [activeFromValue]);

  const addGiftCardFormFields = addGiftCardFormFieldsDynamic?.(
    apiQueryRecipient,
    activeFromValue,
  );

  return {
    handleSubmit,
    onSubmit,
    methods,
    closeAddGiftCardForm,
    addGiftCardFormFields,
    addGiftCardStatus,
  };
};
