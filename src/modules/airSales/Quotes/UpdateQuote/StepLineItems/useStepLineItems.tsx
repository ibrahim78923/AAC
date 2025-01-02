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
  useGetSingleVouchersQuotesQuery,
  // usePutGiftCardValueMutation,
  // usePutLoyaltyProgramConsumersPointsUpdateMutation,
  // useUpdateRedeemRewardMutation,
} from '@/services/airSales/quotes/loyality';
import { isNullOrEmpty } from '@/utils';
import { debounce } from 'lodash';
import { voucherOperator } from './StepLineItems.data';
import { useDispatch } from 'react-redux';
import {
  setConsumersData,
  setGiftCardData,
  setRedeemReward,
  setRewardId,
  setVoucherData,
} from '@/redux/slices/airSales/Quotes/quotesSlice';

const useStepLineItems = (openCreateProduct?: any, calculations?: any) => {
  const theme = useTheme();
  const router = useRouter();
  const methods: any = useForm({});
  const dispatch = useDispatch();

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
  const [checkedItems, setCheckedItems] = useState<any>({});
  const [debouncedValue, setDebouncedValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [VoucherInputValue, setVoucherInputValue] = useState<any>('');
  const [VoucherDebouncedValue, setVoucherDebouncedValue] = useState<any>('');
  const [ConsumerTotalPointsValue, setConsumerTotalPointsValue] =
    useState<any>();
  const [updateSubTotal, setUpdateSubTotal] = useState<any>();
  const [loyaltyRewards, setLoyaltyRewards] = useState<
    { _id: string; value: number }[]
  >([]);
  const [giftCard, setGiftCard] = useState<{ _id: string; value: number }[]>(
    [],
  );
  const [Voucher, setVoucher] = useState<{ _id: string; value: number }[]>([]);
  const [inputValueDiscount, setInputValueDiscount] = useState<any>(0);

  const { data: productsData } = useGetQuoteByIdQuery({
    id: quoteId,
    ...(search && { productSearchKeyword: search }),
  });

  const {
    data: consumerDetails,
    isLoading: consumerDetailLoading,
    refetch,
  }: any = useGetConsumerDetailQuery(
    { consumerId: dataGetQuoteById?.data?.buyerContactId },
    { skip: !dataGetQuoteById?.data?.buyerContactId },
  );

  const isConsumerDetailsDataAvailable =
    consumerDetails?.data && Object.keys(consumerDetails.data).length === 0;

  const createConsumerFunction = async () => {
    if (isConsumerDetailsDataAvailable === true) {
      const consumerPayload = {
        firstName: dataGetQuoteById?.data?.buyerContact?.firstName,
        lastName: dataGetQuoteById?.data?.buyerContact?.lastName,
        email: dataGetQuoteById?.data?.buyerContact?.email,
        address: dataGetQuoteById?.data?.buyerContact?.address,
        phoneNumber: dataGetQuoteById?.data?.buyerContact?.phoneNumber,
        age: dataGetQuoteById?.data?.buyerContact?.age,
        contactId: dataGetQuoteById?.data?.buyerContactId,
        numberOfTransactions: 0,
        totalPointsEarned: 0,
        totalPointRedeemed: 0,
        currentPointBalance: 0,
        status: 'INACTIVE',
      };
      const res: any = await createConsumer({
        body: consumerPayload,
      })?.unwrap();
      if (res?.data) {
        refetch();
      }
    }
  };

  useEffect(() => {
    createConsumerFunction();
  }, [isConsumerDetailsDataAvailable]);

  const consumerTotalPoints = consumerDetails?.data?.totalPointsEarned;

  const { data: ExchangeRate, isLoading: exchangeRateLoading }: any =
    useGetExchangeRateQuery(ConsumerTotalPointsValue, {
      skip: isNullOrEmpty(ConsumerTotalPointsValue),
    });

  const { data: singleTierDetails, isLoading: loadingSingleTierDetails }: any =
    useGetRewardQuery(consumerDetails?.data?._id, {
      skip: !consumerDetails?.data?._id,
    });

  const param = {
    cardNumber: debouncedValue,
  };
  const { data: giftCardData, isError: isErrorGiftCard }: any =
    useGetGiftCardGetBYQuery(param, {
      skip: isNullOrEmpty(debouncedValue),
    });

  const paramVoucher = {
    // consumerId: consumerDetails?.data?._id,
    voucherCode: VoucherDebouncedValue,
  };
  const { data: VoucherData, isError: isErrorVoucher }: any =
    useGetSingleVouchersQuotesQuery(paramVoucher, {
      skip: isNullOrEmpty(VoucherDebouncedValue),
    });

  const subTotal = calculations?.calculationsArray?.find(
    (item: any) => item?.name === 'Sub Total',
  )?.amount;

  useEffect(() => {
    setUpdateSubTotal(parseFloat(subTotal?.replace('£', '').trim()));
  }, [!isNullOrEmpty(subTotal)]);

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

  // Debounce the input value
  useEffect(() => {
    const handler = debounce(() => {
      setVoucherDebouncedValue(VoucherInputValue);
    }, 300); // Adjust the debounce delay as needed

    handler();

    return () => {
      handler?.cancel();
    };
  }, [VoucherInputValue]);

  useEffect(() => {
    setConsumerTotalPointsValue(consumerTotalPoints);
  }, [consumerDetails?.data]);

  // const [updateRedeemReward, { isLoading: loadingUpdateRedeemReward }] =
  //   useUpdateRedeemRewardMutation();
  // const [trigger, { isLoading: loadingUpdateConsumer }] =
  //   usePutLoyaltyProgramConsumersPointsUpdateMutation();
  const [totalRequiredPoints, setTotalRequiredPoints] = useState(0);

  const handleCheckboxChange = async (item: any) => {
    const isChecked = !checkedItems[item?._id];

    if (isChecked && ConsumerTotalPointsValue < item?.requiredPoints) {
      // If the user doesn't have enough points to use
      enqueueSnackbar('Rewards Points are not enough to use', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      return;
    }

    setCheckedItems((prev: any) => ({ ...prev, [item?._id]: isChecked }));

    setConsumerTotalPointsValue((prevValue: any) =>
      isChecked
        ? prevValue - item?.requiredPoints
        : prevValue + item?.requiredPoints,
    );

    setUpdateSubTotal((prevValue: any) => {
      const exchangeRate: any = (
        ExchangeRate?.data?.calculatedExchangeRate / ConsumerTotalPointsValue
      )?.toFixed(2);
      const newValue = !isChecked
        ? exchangeRate * item?.requiredPoints
        : -exchangeRate * item?.requiredPoints;
      return prevValue + newValue;
    });

    setLoyaltyRewards((prevRewards) => {
      if (isChecked) {
        return [
          ...prevRewards,
          {
            _id: item?._id,
            value:
              (ExchangeRate?.data?.calculatedExchangeRate /
                ConsumerTotalPointsValue) *
              item?.requiredPoints,
          },
        ];
      } else {
        return prevRewards?.filter((reward) => reward?._id !== item?._id);
      }
    });

    // Calculate the total required points
    setTotalRequiredPoints((prevTotal) =>
      isChecked
        ? prevTotal + item?.requiredPoints
        : prevTotal - item?.requiredPoints,
    );

    // redeemReward payload
    const redeemRewardPayLoad = {
      escrowRedeemedPoints: isChecked
        ? totalRequiredPoints + item?.requiredPoints
        : totalRequiredPoints - item?.requiredPoints,
      redeemedRewardPerConsumer: {
        consumerId: consumerDetails?.data?._id,
        redeemedLimit: 1,
        escrowStatus: 'Reserved',
      },
    };

    dispatch(setRedeemReward(redeemRewardPayLoad));
    dispatch(setRewardId(item?._id));

    // redeemReward payload

    // try {
    //   await updateRedeemReward({ id: item?._id, body: payLoad })?.unwrap();
    //   await trigger(consumersPayLoad)?.unwrap();
    //   enqueueSnackbar('Reward updated', {
    //     variant: NOTISTACK_VARIANTS?.SUCCESS,
    //   });
    // } catch (error: any) {
    //   enqueueSnackbar('Error while updating reward', {
    //     variant: NOTISTACK_VARIANTS?.ERROR,
    //   });
    // }
  };

  // set consumer data in redux
  const [totalLoyaltyRewardsValue, setTotalLoyaltyRewardsValue] = useState(0);
  useEffect(() => {
    const totalValue = loyaltyRewards?.reduce(
      (acc, reward) => acc + reward?.value,
      0,
    );
    setTotalLoyaltyRewardsValue(totalValue);
  }, [loyaltyRewards]);

  useEffect(() => {
    const consumersPayLoad = {
      currentPointBalance: totalLoyaltyRewardsValue,
      totalPointRedeemed: consumerDetails?.data?.totalPointRedeemed,
      totalPointsEarned: consumerTotalPoints,
      numberofTransactions: 1,
      ids: [consumerDetails?.data?._id],
    };

    dispatch(setConsumersData(consumersPayLoad));
  }, [totalLoyaltyRewardsValue]);

  // set consumer data in redux

  useEffect(() => {
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

    dispatch(setGiftCardData(patchParameter));
  }, [inputValueDiscount]);

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
    if (
      Number(value) > giftCardData?.data?.currentamount ||
      Number(value) > updateSubTotal
    ) {
      setDisabledButton(true);
      enqueueSnackbar(`Value cannot exceed from Current Amount or Sub Total`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } else {
      setDisabledButton(false);
    }
  };

  // const [updateApi, { isLoading: updateGiftCardIsLoading }] =
  //   usePutGiftCardValueMutation();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // Update GiftCard state
    setGiftCard([{ _id: giftCardData?.data?._id, value: inputValueDiscount }]);

    setUpdateSubTotal(updateSubTotal - parseFloat(inputValueDiscount));
    setDisabledButton(true);
    enqueueSnackbar('Discount Added', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });

    // const patchParameter = {
    //   queryParams: { cardNumber: giftCardData?.data?.cardNumber },
    //   body: {
    //     currentamount: giftCardData?.data?.currentamount - inputValueDiscount,
    //     escrowAmount: inputValueDiscount,
    //     transactionAmount: inputValueDiscount,
    //     escrowAmountStatus: 'Pending',
    //     quotesId: quoteId,
    //   },
    // };

    // try {
    //   await updateApi(patchParameter).unwrap();
    //   enqueueSnackbar('Update successful', {
    //     variant: NOTISTACK_VARIANTS?.SUCCESS,
    //   });
    //   refetch();
    // } catch (error) {
    //   enqueueSnackbar('Error while updating', {
    //     variant: NOTISTACK_VARIANTS?.ERROR,
    //   });
    // }
  };
  const [discountVoucherValue, setDiscountVoucherValue] = useState(0);

  useEffect(() => {
    if (VoucherData?.data?.length > 0) {
      const voucher = VoucherData.data[0];
      const { addAmount, percentageOff }: any = voucher;
      let discountVoucher = 0;

      if (
        voucher?.operator === voucherOperator?.LESS_THAN &&
        updateSubTotal < addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.GREATER_THAN &&
        updateSubTotal > addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.EQUAL_TO &&
        updateSubTotal === addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.LESS_THAN_OR_EQUAL &&
        updateSubTotal <= addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.GREATER_THAN_OR_EQUAL &&
        updateSubTotal >= addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else {
        enqueueSnackbar('you can not avail this voucher', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
      setUpdateSubTotal(updateSubTotal - discountVoucher);
      setDiscountVoucherValue(discountVoucher);
      // Update Voucher state
      setVoucher([{ _id: voucher?._id, value: discountVoucher }]);

      if (discountVoucher != 0) {
        const VoucherParameter = {
          queryParams: {
            voucherCode: VoucherData?.data[0]?.voucherCode,
            consumerId: consumerDetails?.data?._id,
          },
          body: {
            ascrowRedeemedVoucherLimit: 2,
            redeemedVoucherLimit: 0,
            redeemedPerConsumer: {
              consumerId: consumerDetails?.data?._id,
              earnDiscountAmount: percentageOff,
              escrowStatus: 'Reserved',
              quotesId: quoteId,
              redeemedLimit: 1,
            },
          },
        };
        dispatch(setVoucherData(VoucherParameter));
      }
    }
    if (VoucherData?.data?.message) {
      enqueueSnackbar(`${VoucherData?.data?.message}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  }, [VoucherData?.data]);

  const totalLoyaltyRewardsSum = loyaltyRewards?.reduce(
    (acc, item) => acc + item?.value,
    0,
  );
  const totalVoucherSum = Voucher?.reduce((acc, item) => acc + item?.value, 0);
  const totalGiftCardSum = giftCard?.reduce(
    (acc, item) => acc + parseFloat(item?.value),
    0,
  );

  const totalSumDiscount =
    totalLoyaltyRewardsSum + totalVoucherSum + totalGiftCardSum;

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
    ConsumerTotalPointsValue,
    ExchangeRate,
    singleTierDetails,
    handleCheckboxChange,
    checkedItems,
    loadingSingleTierDetails,
    exchangeRateLoading,
    setInputValue,
    inputValue,
    isErrorGiftCard,
    giftCardData,
    onSubmit,
    inputValueDiscount,
    handleInputChange,
    disabledButton,
    VoucherInputValue,
    setVoucherInputValue,
    isErrorVoucher,
    updateSubTotal,
    setDiscountVoucherValue,
    setUpdateSubTotal,
    discountVoucherValue,
    setInputValueDiscount,
    totalLoyaltyRewardsSum,
    totalVoucherSum,
    totalGiftCardSum,
    totalSumDiscount,
    setVoucher,
    setGiftCard,
    Voucher,
    giftCard,
    loyaltyRewards,
    consumerDetailLoading,
  };
};

export default useStepLineItems;
