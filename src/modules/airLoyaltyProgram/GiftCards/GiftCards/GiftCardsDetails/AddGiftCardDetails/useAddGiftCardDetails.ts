import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addGiftCardDetailsDefaultValues,
  addGiftCardDetailsFormFieldsDynamic,
  addGiftCardDetailsValidationSchema,
} from './AddGiftCardDetails.data';
import {
  useAddGiftCardDetailsMutation,
  useGetSingleGiftCardQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { STATUS } from '@/constants/strings';

export const useAddGiftCardDetails = (props: any) => {
  const { setIsPortalOpen, handleRefetchTransactionsList } = props;
  const router = useRouter();
  const { giftCardNumber }: any = router?.query;

  const singleGiftCardParams = {
    cardNumber: giftCardNumber,
  };

  const { data, refetch } = useGetSingleGiftCardQuery<any>(
    singleGiftCardParams,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const handleRefetchSingleGiftCard = async () => {
    await refetch();
  };

  const currentAmount = data?.data?.currentamount;
  const spentAmount = data?.data?.spentamount;

  const [addDigitalGiftCardDetailsTrigger, addDigitalGiftCardDetailsStatus] =
    useAddGiftCardDetailsMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(addGiftCardDetailsValidationSchema(currentAmount)),
    defaultValues: addGiftCardDetailsDefaultValues?.(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const apiDataParameter = {
      queryParams: { cardNumber: giftCardNumber },
      body: {
        currentamount: Number(currentAmount) - Number(formData?.amount),
        spentamount: Number(spentAmount) + Number(formData?.amount),
        transactionAmount: Number(formData?.amount),
        escrowAmountStatus: STATUS?.DONE,
      },
    };

    try {
      const res: any =
        await addDigitalGiftCardDetailsTrigger(apiDataParameter)?.unwrap();
      successSnackbar(res?.message ?? 'Transaction added successfully');
      handleRefetchTransactionsList();
      handleRefetchSingleGiftCard();
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
