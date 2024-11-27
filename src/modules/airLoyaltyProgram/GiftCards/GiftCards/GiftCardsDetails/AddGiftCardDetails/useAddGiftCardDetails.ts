import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addGiftCardDetailsDefaultValues,
  addGiftCardDetailsFormFieldsDynamic,
  addGiftCardDetailsValidationSchema,
} from './AddGiftCardDetails.data';
import { useAddGiftCardDetailsMutation } from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';

export const useAddGiftCardDetails = (props: any) => {
  const { setIsPortalOpen, handleRefetchList } = props;
  const router = useRouter();
  const { giftCardNumber } = router?.query;

  const [addDigitalGiftCardDetailsTrigger, addDigitalGiftCardDetailsStatus] =
    useAddGiftCardDetailsMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardDetailsValidationSchema),
    defaultValues: addGiftCardDetailsDefaultValues?.(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const apiDataParameter = {
      queryParams: { cardNumber: giftCardNumber },
      body: {
        transactionAmount: formData?.amount,
      },
    };
    try {
      await addDigitalGiftCardDetailsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Transaction Added Successfully');
      handleRefetchList();
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
