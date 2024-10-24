import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addGiftCardDetailsDefaultValues,
  addGiftCardDetailsFormFieldsDynamic,
  addGiftCardDetailsValidationSchema,
} from './AddGiftCardDetails.data';
import { useAddGiftCardDetailsMutation } from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useAddGiftCardDetails = (props: any) => {
  const { setIsPortalOpen } = props;
  const [addDigitalGiftCardDetailsTrigger, addDigitalGiftCardDetailsStatus] =
    useAddGiftCardDetailsMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardDetailsValidationSchema),
    defaultValues: addGiftCardDetailsDefaultValues?.(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const body = {
      giftCardId: formData?.giftCardId,
      add: formData?.add,
      amount: formData?.amount,
    };
    const apiDataParameter = {
      body,
    };
    try {
      await addDigitalGiftCardDetailsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Card Added Successfullt');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    closeAddDigitalGiftCardForm?.();
    reset();
  };

  const closeAddDigitalGiftCardForm = () => {
    reset();
    setIsPortalOpen(false);
  };

  const addGiftCardDetailsFormFields = addGiftCardDetailsFormFieldsDynamic?.();

  return {
    handleSubmit,
    onSubmit,
    methods,
    closeAddDigitalGiftCardForm,
    addGiftCardDetailsFormFields,
    addDigitalGiftCardDetailsStatus,
  };
};
