import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  useAddGiftCardDetailsMutation,
  useLazyGetShopDropdownForGiftCardDetailsQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/details';
import {
  addGiftCardDetailsDefaultValues,
  addGiftCardDetailsFormFieldsDynamic,
  addGiftCardDetailsValidationSchema,
} from './AddTranscation.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
export const useAddTransaction = (props: any) => {
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
      shop: formData?._id,
      contact: formData?.contact,
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
    setIsPortalOpen({});
  };
  const shopApiQuery = useLazyGetShopDropdownForGiftCardDetailsQuery?.();

  const addGiftCardDetailsFormFields =
    addGiftCardDetailsFormFieldsDynamic?.(shopApiQuery);

  return {
    handleSubmit,
    onSubmit,
    methods,
    closeAddDigitalGiftCardForm,
    addGiftCardDetailsFormFields,
    addDigitalGiftCardDetailsStatus,
  };
};
