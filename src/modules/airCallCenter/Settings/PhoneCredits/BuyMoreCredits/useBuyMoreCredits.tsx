import { useForm } from 'react-hook-form';
import {
  buyMoreCreditsFormDefaultValues,
  buyMoreCreditsFormFieldsDynamic,
} from './BuyMoreCredits.data';
import { successSnackbar } from '@/utils/api';
import { useState } from 'react';
export const useBuyMoreCredits = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [addNewCard, setAddNewCard] = useState(false);
  const [emailButton, setEmailButton] = useState(false);
  const methods = useForm({
    defaultValues: buyMoreCreditsFormDefaultValues(addNewCard),
  });
  const { handleSubmit, reset, watch } = methods;
  const secureTransaction = watch('secureTransaction');
  const onSubmit = async () => {
    setIsDrawerOpen?.(false);
    successSnackbar('Call Tag Added Successfully');
  };
  const cancelBuyMoreCreditsForm = async () => {
    addNewCard ? setAddNewCard(false) : setIsDrawerOpen?.(false);
  };
  const buyMoreCreditsFormFields = buyMoreCreditsFormFieldsDynamic(addNewCard);
  return {
    methods,
    handleSubmit,
    onSubmit,
    cancelBuyMoreCreditsForm,
    buyMoreCreditsFormFields,
    reset,
    setAddNewCard,
    addNewCard,
    secureTransaction,
    emailButton,
    setEmailButton,
  };
};
