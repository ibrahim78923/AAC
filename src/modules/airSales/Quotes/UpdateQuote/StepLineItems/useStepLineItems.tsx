import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { enqueueSnackbar } from 'notistack';
import { usePutSubmitQuoteMutation } from '@/services/airSales/quotes';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useCreateConsumerMutation,
  useGetConsumerDetailQuery,
  useGetExchangeRateQuery,
  useGetGiftCardGetBYQuery,
  useGetRewardQuery,
  usePutGiftCardValueMutation,
  usePutLoyaltyProgramConsumersPointsUpdateMutation,
  useUpdateRedeemRewardMutation,
} from '@/services/airSales/quotes/loyality';
import { isNullOrEmpty } from '@/utils';
import { debounce } from 'lodash';

const useStepLineItems = (openCreateProduct?: any) => {
  const theme = useTheme();
  const router = useRouter();
  const methods: any = useForm({});

  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [checkedIs, setCheckedIs] = useState({
    voucher: false,
    giftBox: false,
  });

  let quoteId: any;
  if (router?.query?.data) {
    quoteId = router?.query?.data;
  }

  const producttUpdateType = {
    increment_discount: 'disc_inc',
    decrement_discount: 'disc_dec',
    increment_quantity: 'quant_inc',
    decrement_quantity: 'quant_dec',
  };

  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });
  const [createConsumer] = useCreateConsumerMutation();
  const [putSubmitQuote] = usePutSubmitQuoteMutation();
  const [checkedItems, setCheckedItems] = useState({});
  const [debouncedValue, setDebouncedValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data: productsData } = useGetQuoteByIdQuery({
    id: quoteId,
    ...(search && { productSearchKeyword: search }),
  });

  const {
    data: consumerDetails,
    //  isLoading: consumerDetailLoading,
    ...response
  }: any = useGetConsumerDetailQuery(
    // dataGetQuoteById?.data?.buyerContactId,
    '672b49c61c76da9dcf9fd990',
    // { skip: !dataGetQuoteById?.data?.buyerContactId }
  );
  const consumerTotalPoints = consumerDetails?.data?.totalPointsEarned;

  const { data: ExchangeRate }: any = useGetExchangeRateQuery(
    consumerTotalPoints,
    { skip: isNullOrEmpty(consumerTotalPoints) },
  );

  const { data: singleTierDetails, isLoading: loadingSingleTierDetails }: any =
    useGetRewardQuery('672b49c61c76da9dcf9fd990');

  const param = {
    cardNumber: debouncedValue,
  };
  const {
    data: giftCardData,
    isError: isErrorGiftCard,
    refetch,
  }: any = useGetGiftCardGetBYQuery(param, {
    skip: isNullOrEmpty(debouncedValue),
  });

  // Debounce the input value
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(inputValue);
    }, 300); // Adjust the debounce delay as needed

    handler();

    return () => {
      handler?.cancel();
    };
  }, [inputValue]);

  const [updateRedeemReward, { isLoading: loadingUpdateRedeemReward }] =
    useUpdateRedeemRewardMutation();
  const [trigger, { isLoading: loadingUpdateConsumer }] =
    usePutLoyaltyProgramConsumersPointsUpdateMutation();

  const handleCheckboxChange = async (item: any) => {
    const isChecked = !checkedItems[item?._id];
    setCheckedItems((prev) => ({ ...prev, [item?._id]: isChecked }));

    const payLoad = {
      redeemedPoints: isChecked ? item?.requiredPoints : 0,
      redeemedRewardPerConsumer: {
        consumerId: '672b49c61c76da9dcf9fd990',
        redeemedLimit: 1,
      },
    };

    const consumersPayLoad = {
      currentPointBalance: item?.requiredPoints,
      totalPointRedeemed: consumerDetails?.data?.totalPointRedeemed,
      totalPointsEarned: consumerTotalPoints,
      numberofTransactions: 1,
      ids: ['672b49c61c76da9dcf9fd990'],
    };

    try {
      await updateRedeemReward({ id: item?._id, body: payLoad })?.unwrap();
      await trigger(consumersPayLoad)?.unwrap();
      enqueueSnackbar('Reward updated', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar('Error while updating reward', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const createConsumerFunction = async () => {
    if (response.error?.data?.message === 'Consumer not found.') {
      const consumerPayload = {
        firstName: dataGetQuoteById?.data?.buyerContact?.firstName,
        lastName: dataGetQuoteById?.data?.buyerContact?.lastName,
        email: dataGetQuoteById?.data?.buyerContact?.email,
        address: dataGetQuoteById?.data?.buyerContact?.address,
        phoneNumber: dataGetQuoteById?.data?.buyerContact?.phoneNumber,
        contactId: dataGetQuoteById?.data?.buyerContactId,
      };
      await createConsumer({ body: consumerPayload })?.unwrap();
    }
  };
  useEffect(() => {
    createConsumerFunction();
  }, [response.error?.data?.message === 'Consumer not found.']);

  const handleDeleteDeals = async (productId: string) => {
    const remainingProducts = productsData?.data?.products?.filter(
      (product: any) => product?.productId !== productId,
    );

    try {
      const submitQuotesPayload = {
        id: productsData?.data?._id,
        status: 'DRAFT',
        products: remainingProducts,
        dealAmount: productsData?.data?.dealAmount,
      };

      await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
      enqueueSnackbar('Product deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch {
      enqueueSnackbar('Error while deleting product', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleAction = (id: string, action: string) => {
    router.push(
      `?data=${quoteId}${
        action === 'create' ? '' : `&productId=${id}`
      }&type=${action}`,
    );
    openCreateProduct();
  };

  const handleQuantityChange = async (data: any, type: string) => {
    if (data) {
      const productRespParams = { ...data };
      switch (type) {
        case producttUpdateType?.decrement_quantity:
          productRespParams.additionalQuantity = data?.additionalQuantity - 1;
          break;
        case producttUpdateType?.increment_quantity:
          productRespParams.additionalQuantity = data?.additionalQuantity + 1;
          break;
        case producttUpdateType?.decrement_discount:
          productRespParams.unitDiscount = data?.unitDiscount - 1;
          break;
        case producttUpdateType?.increment_discount:
          productRespParams.unitDiscount = data?.unitDiscount + 1;
          break;
        default:
          break;
      }

      const updatedProducts = productsData?.data?.products?.filter(
        (product: any) => product?.productId !== data?.productId,
      );
      updatedProducts?.push(productRespParams);

      const submitQuotesPayload = {
        id: dataGetQuoteById?.data?._id,
        status: 'DRAFT',
        products: updatedProducts,
      };

      await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
      enqueueSnackbar('Product updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    }
  };
  const [disabledButton, setDisabledButton] = useState(true);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValueDiscount(value);

    // Real-time validation
    if (Number(value) > giftCardData?.data?.currentamount) {
      setDisabledButton(true);
      enqueueSnackbar(
        `Value cannot exceed ${giftCardData?.data?.currentamount}`,
        {
          variant: NOTISTACK_VARIANTS?.ERROR,
        },
      );
    } else {
      setDisabledButton(false);
    }
  };

  const [inputValueDiscount, setInputValueDiscount] = useState();
  const [updateApi, { isLoading: updateGiftCardIsLoading }] =
    usePutGiftCardValueMutation();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const patchParameter = {
      queryParams: { cardNumber: giftCardData?.data?.cardNumber },
      body: {
        currentamount: giftCardData?.data?.currentamount - inputValueDiscount,
        escrowAmount: inputValueDiscount,
        transactionAmount: inputValueDiscount,
        escrowAmountStatus: 'Pending',
        quotesId: quoteId,
      },
    };

    try {
      await updateApi(patchParameter).unwrap();
      enqueueSnackbar('Update successful', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      refetch();
    } catch (error) {
      enqueueSnackbar('Error while updating', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    setSearch,
    isChecked,
    setIsChecked,
    checkedIs,
    setCheckedIs,
    methods,
    theme,
    handleDeleteDeals,
    handleAction,
    productsData,
    handleQuantityChange,
    producttUpdateType,
    router,
    consumerTotalPoints,
    ExchangeRate,
    singleTierDetails,
    handleCheckboxChange,
    checkedItems,
    loadingUpdateRedeemReward,
    loadingSingleTierDetails,
    loadingUpdateConsumer,
    setInputValue,
    inputValue,
    isErrorGiftCard,
    giftCardData,
    onSubmit,
    inputValueDiscount,
    handleInputChange,
    disabledButton,
    updateGiftCardIsLoading,
  };
};

export default useStepLineItems;
